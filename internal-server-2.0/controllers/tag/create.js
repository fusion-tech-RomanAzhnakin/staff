const tagService = require('../../db/services/tag');

const create = async (req, res, next) => {
  try {
    const { title } = req.body;

    const tag = await tagService.create({ title });

    res.json(tag);
  } catch (err) {
    err.functionName = create.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = create;
