const moment = require('moment');

const db = require('../../models/index');
const { calendarGenerator } = require('../calendar/calendarGenerator');
const config = require('../../config/index');
const { rtm } = require('../../slackBot');

const getName = (user) => {
  if (user.slack_conversational_id) {
    return `<@${user.slack_conversational_id}>`;
  } if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.login;
};

const messageFormation = ({
  user, workDays, time_limits, title, mentor,
}) => {
  const nameUser = getName(user);
  const nameMentor = getName(mentor);

  const delay = workDays - time_limits;
  let formOfWordDay;
  const condition = delay % 100;
  if (condition > 10 && condition < 15) {
    formOfWordDay = 'дней';
  } else if (condition % 10 === 1) {
    formOfWordDay = 'день';
  } else if (condition % 10 > 1 && condition % 10 < 5) {
    formOfWordDay = 'дня';
  } else {
    formOfWordDay = 'дней';
  }

  return `${mentor.slack_conversational_id
    ? nameMentor
    : ''
  } Напоминание. У ${nameUser} просрочена задача '${title}' на ${delay} ${formOfWordDay} (${workDays} из ${time_limits})`;
};

const getWorkDays = (dateOfStart, currentDate, calendar) => {
  let date = moment(dateOfStart);
  const diffStartNow = moment(currentDate).startOf('d').diff(date.startOf('d'), 'd');

  let workdays = 0;
  for (let i = 0; i <= diffStartNow; i += 1) {
    if (date.format('DD-MM_YYYY') in calendar) {
      workdays += calendar[date.format('DD-MM_YYYY')] ? 0 : 1;
    } else {
      const dayOfWeek = date.format('d');
      workdays += (dayOfWeek === '0' || dayOfWeek === '6') ? 0 : 1;
    }
    date = date.add(1, 'days');
  }

  return workdays;
};


exports.default = async function notifyExpiredTask() {
  try {
    const activeTasks = await db.plan_taskJob.findAll({
      where: {
        startTask: {
          [db.Sequelize.Op.not]: null,
        },
        finishTask: {
          [db.Sequelize.Op.is]: null,
        },
      },
      include: [
        {
          model: db.taskJob,
          attributes: ['time_limits', 'title'],
          where: {
            time_limits: {
              [db.Sequelize.Op.not]: null,
            },
          },
        },
      ],
    });

    const { dates } = calendarGenerator.calendar;
    const currentDate = new Date();
    const year = moment(currentDate).get('year');

    let datesNormalize = dates[year - 1] ? dates[year - 1].reduce((combo, item) => {
      combo[item.day] = item.is_holiday;
      return combo;
    }, {}) : {};

    datesNormalize = dates[year] ? dates[year].reduce((combo, item) => {
      combo[item.day] = item.is_holiday;
      return combo;
    }, datesNormalize) : datesNormalize;


    for (const task of activeTasks) {
      const { time_limits, title } = task.taskJob;
      const { startTask } = task;

      const workDays = getWorkDays(startTask, currentDate, datesNormalize);
      if (workDays > time_limits) {
        const res = await db.plan.findOne({
          include: { model: db.user },
          where: { id: task.plan_id },
        });

        const user = res.users[0];
        const mentor = await db.user.findOne({
          where: { id: user.mentor_id },
          attributes: ['firstName', 'lastName', 'login', 'slack_conversational_id'],
        });

        const message = messageFormation({
          user,
          workDays,
          time_limits,
          title,
          mentor,
        });

        if (
          workDays > Math.ceil(time_limits * config.acceptableDelay + time_limits)
          || !mentor.slack_conversational_id
        ) {
          const data = {
            channel: config.internManagerChannelId,
            text: `<!channel>, ${message}`,
          };

          await rtm.sendToChat(data, 'student');
        } else {
          const data = {
            channel: mentor.slack_conversational_id,
            text: message,
          };

          await rtm.sendToChat(data, 'student');
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// at 10:00 everyday
module.exports.cronExpression = '0 10 * * *';
