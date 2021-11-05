const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');

/**
 * @param {{
 *  title: string;
 * }} data
 */
const create = async (data) => {
  const tag = await db.tag.findOrCreate({ where: data });

  return tag[0];
};

/**
 * @param { number } id
 */
const getOne = async (id) => {
  const tag = await db.tag.findByPk(id);

  return tag;
};

/**
 * @param {{
 *  sort: {
 *    sortBy: string;
 *    sortDirection: 'straight' | 'reverse';
 *  },
 * }} params
 */
const getAll = async (params) => {
  const query = new SearchBuilder({
    sort: params.sort,
  }).buildQuery();

  const tags = await db.tag.findAll(query);

  return tags;
};

/**
 * @param {number} id
 * @param {{
 *  title: string
 * }} data
 */
const update = async (id, data) => {
  const tag = await db.tag.update(data, {
    where: { id },
    returning: true,
  });

  return tag[1];
};

/**
 * @param { number } id
 */
const deleteOne = async (id) => {
  await db.tag.destroy({ where: { id } });
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  deleteOne,
};
