const db = require('../models/index');

const getGroups = async (req, res) => {
  try {
    const groups = await db.matrix_groups.findAll({
      attributes: ['id', 'title'],
      include: [{
        model: db.matrix_sections,
        attributes: ['id', 'title'],
        include: [{
          model: db.matrix_skills,
          attributes: ['id', 'title', 'description', 'level'],
        }],
      }],
      order: [
        ['id', 'ASC'],
        [db.matrix_sections, 'id', 'ASC'],
        [db.matrix_sections, db.matrix_skills, 'id', 'ASC'],
      ],
    });
    return res.status(200).json({ data: groups });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postGroup = async (req, res) => {
  try {
    const newGroup = {
      title: req.body.title,
    };
    const group = await db.matrix_groups.create(newGroup);
    return res.status(200).json({ data: group });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    await db.matrix_groups.update(newData, {
      where: { id },
    });
    return res.json({ message: 'Successfully edited!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await db.matrix_groups.destroy({ where: { id } });
    return res.json(group);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSections = async (req, res) => {
  try {
    const sections = await db.matrix_sections.findAll({});
    return res.status(200).json({ sections });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postSection = async (req, res) => {
  try {
    const newSection = {
      title: req.body.title,
      group_id: req.body.group_id,
    };
    const section = await db.matrix_sections.create(newSection);
    return res.status(200).json({ data: section });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editSection = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    await db.matrix_sections.update(newData, {
      where: { id },
    });
    return res.json({ message: 'Successfully edited!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await db.matrix_sections.destroy({ where: { id } });
    return res.json(section);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await db.matrix_skills.findAll({});
    return res.status(200).json({ skills });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postSkill = async (req, res) => {
  try {
    const newSkill = {
      title: req.body.title,
      description: req.body.description,
      section_id: req.body.section_id,
      level: req.body.level,
    };
    const skill = await db.matrix_skills.create(newSkill);
    return res.status(200).json({ data: skill });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    await db.matrix_skills.update(newData, {
      where: { id },
    });
    return res.json({ message: 'Successfully edited!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await db.matrix_skills.destroy({ where: { id } });
    return res.json(skill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserSkills = async (req, res) => {
  const { id } = req.params;
  try {
    const user_matrix_skills = await db.user_matrix_skills.findAll({
      where: {
        user_id: id,
      },
      include: [{
        model: db.matrix_skill_comments,
        attributes: ['id', 'text', 'created_by', 'updatedAt'],
      }],
    });
    return res.status(200).json({ user_matrix_skills });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postUserSkill = async (req, res) => {
  try {
    const newUserSkill = {
      user_id: req.body.user_id,
      matrix_skill_id: req.body.matrix_skill_id,
      knowledge_level: req.body.knowledge_level,
      comment: req.body.comment,
      learn_sources: req.body.learn_sources,
    };
    const userSkill = await db.user_matrix_skills.create(newUserSkill);
    return res.status(200).json({ data: userSkill });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editUserSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    await db.user_matrix_skills.update(newData, {
      where: { id },
    });
    return res.json({ message: 'Successfully edited!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const selfEstimate = async (req, res) => {
  try {
    const { skillId } = req.params;

    const [userSkill] = await db.user_matrix_skills.findOrCreate({
      where: {
        user_id: req.user.id,
        matrix_skill_id: +skillId,
      },
    });

    userSkill.self_rating = req.body.selfRating;
    await userSkill.save();

    return res.json(userSkill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUserSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const user_skill = await db.user_matrix_skills.destroy({ where: { id } });
    return res.json(user_skill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMatrixSkillComments = async (req, res) => {
  const userSkillId = req.params.id;
  try {
    const comments = await db.matrix_skill_comments.findAll({
      where: {
        user_matrix_skill_id: userSkillId,
      },
    });
    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postMatrixSkillComment = async (req, res) => {
  try {
    const newComment = {
      user_matrix_skill_id: req.body.user_matrix_skill_id,
      created_by: req.body.created_by,
      text: req.body.text,
    };
    const comment = await db.matrix_skill_comments.create(newComment);
    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editMatrixSkillComment = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    await db.matrix_skill_comments.update(newData, {
      where: { id },
    });
    return res.json({ message: 'Successfully edited!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteMatrixSkillComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await db.matrix_skill_comments.destroy({ where: { id } });
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getGroups,
  postGroup,
  editGroup,
  deleteGroup,

  getSections,
  postSection,
  editSection,
  deleteSection,

  getSkills,
  postSkill,
  editSkill,
  deleteSkill,

  getUserSkills,
  postUserSkill,
  editUserSkill,
  selfEstimate,
  deleteUserSkill,

  getMatrixSkillComments,
  postMatrixSkillComment,
  editMatrixSkillComment,
  deleteMatrixSkillComment,
};
