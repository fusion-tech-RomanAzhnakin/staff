const { Op } = require('sequelize');
const db = require('../models/index');


const getMentors = async (req, res) => {
  const { sort = ['lastName', 'ASC'] } = req.query;

  try {
    const mentors = await db.user.findAll({
      where: {
        role: {
          [Op.in]: ['mentor', 'admin'],
        },
      },
      order: [sort],
      attributes: [
        'login', 'id', 'avatar', 'avatarThumbnail',
        'firstName', 'lastName', 'status', 'role', 'mentor_id',
      ],
    });

    res.status(200).json({ mentors });
  } catch (err) {
    console.error('getMentors error:', err.message);
    res.status(500).send(err.message);
  }
};

const updateMentor = async (req, res) => {
  const { userId, mentorId } = req.body;

  try {
    const mentors = await db.user.update({
      mentor_id: mentorId,
    }, {
      where: {
        id: userId,
      },
    });

    return res.status(200).send(mentors);
  } catch (err) {
    console.error('getMentors error:', err);
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getMentors,
  updateMentor,
};
