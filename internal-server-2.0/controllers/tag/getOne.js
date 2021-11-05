const tagService = require('../../db/services/tag');

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await tagService.getOne(id);

    res.json(tag);
  } catch (err) {
    err.functionName = getOne.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = getOne;
