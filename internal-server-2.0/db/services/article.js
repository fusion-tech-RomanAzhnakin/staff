const { StatusCodes } = require('http-status-codes');

const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');
const { createError } = require('../../utils/createError');

/**
 * @param {{
 *  sort: {
 *    sortBy: string;
 *    sortDirection: 'straight' | 'reverse';
 *  },
 * }} params
 */
const getList = async (params) => {
  const query = new SearchBuilder({
    sort: params.sort,
    include: [
      {
        model: 'tag',
        as: 'tags',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    ],
  }).buildQuery(db);

  const articles = await db.article.findAll(query);

  return articles;
};

/**
 * @param {{
 *  pagination: {
 *    perPage: string,
 *    page: string,
 *  },
 *  sort: {
 *    sortBy: string,
 *    sortDirection: 'straight' | 'reverse',
 *  },
 *  filter: {
 *    mainFilter: {
 *      added_by: {
 *        type: string,
 *        value: number[],
 *      },
 *      search: {
 *        fields: string[],
 *        type: string,
 *        value: string,
 *      },
 *    },
 *    includedModelsFilter: {
 *      tags: {
 *        id: {
 *          type: string,
 *          value: number[],
 *        },
 *      },
 *    },
 *  },
 * }} params
 */
const getFilteredIdList = async (params) => {
  const { mainFilter, includedModelsFilter } = params.filter;

  const tagsFilter = new SearchBuilder({ filter: includedModelsFilter.tags }).getFilter();
  const query = new SearchBuilder({
    pagination: params.pagination,
    sort: params.sort,
    filter: mainFilter,
    include: [
      {
        model: 'tag',
        as: 'tags',
        ...tagsFilter,
        attributes: [],
        through: {
          attributes: [],
        },
      },
    ],
  }).buildQuery(db);

  const articles = await db.article.findAll({
    ...query,
    attributes: ['id'],
  });

  return articles;
};

/**
 * @param {{
 *  title: string,
 *  description: string,
 *  image: string,
 *  url: string,
 *  link: string,
 *  added_by: number,
 *  tags: number[],
 * }} data;
 */
const create = async (data) => {
  const { tags, ...articleData } = data;
  const createdArticle = await db.article.create(articleData);
  await createdArticle.setTags(tags);

  return {
    ...createdArticle.dataValues,
    tags,
  };
};

/**
 * @param {number} id;
 * @param {{
 *  id: string,
 *  role: string,
 * }} user
 */
const deleteOne = async (id, user) => {
  const article = await db.article.findByPk(id);

  if (user.id !== article.added_by && user.role !== 'admin') {
    throw createError('No rights to delete', { code: StatusCodes.FORBIDDEN });
  }

  await article.destroy();
};

module.exports = {
  create,
  getList,
  getFilteredIdList,
  deleteOne,
};
