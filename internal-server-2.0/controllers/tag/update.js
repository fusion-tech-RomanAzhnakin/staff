const tagService = require('../../db/services/tag');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = {
      title: req.body.title,
    };

    const updatedTag = await tagService.update(id, newData);

    res.json(updatedTag);
  } catch (err) {
    err.functionName = update.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = update;
