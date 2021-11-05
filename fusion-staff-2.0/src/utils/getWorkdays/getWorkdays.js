import differenceInDays from 'date-fns/differenceInDays';
import parse from 'date-fns/parse';
import holydays from './holydays';

const workdaysCounter = (accumulator, currentDate) => {
  if (!currentDate.is_holiday) {
    // eslint-disable-next-line no-param-reassign
    accumulator += 1;
  }
  return accumulator;
};

const getWorkdays = (dateFrom, dateTo) => {
  const daysWithoutYear = Object.values(holydays).reduce((a, b) => a.concat(b));

  const firstDay = parse(daysWithoutYear[0].day, 'd-M_yyyy', new Date());

  const diffStart = differenceInDays(dateFrom, firstDay);

  const diffEnd = differenceInDays(dateTo, dateFrom);

  const days = daysWithoutYear.slice(diffStart, diffEnd + diffStart);

  return days.reduce(workdaysCounter, 0);
};

export default getWorkdays;
