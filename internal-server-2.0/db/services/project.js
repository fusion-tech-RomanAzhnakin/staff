const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');

/**
 * @param {{
 * title: string,
 * images: Array<string>,
 * href: string,
 * description: string,
 * description_ru: string,
 * status: string,
 * role: Array<JSON>,
 * user_id: Array<number>,
 * technologies_id: Array<number>,
 * }} data
 */
const create = async (data) => {
  const resultData = { ...data };
  const roles = JSON.parse(resultData.role);
  resultData.role = roles;
  const newProject = await db.project.create(resultData);
  await newProject.setTechnologies(resultData.technologies_id);
  await newProject.setUser(resultData.user_id);
  return newProject.toJSON();
};

/**
 * @param {{
 *   pagination: {
 *    perPage: number;
 *     page: number;
 *     limit: number
 *     offset: number
 *   };
 *   sort: {
 *     sortBy: string;
 *     sortDirection: "straight" | "reverse";
 *   };
 *   filter: {
 *   };
 *   include: Array<{
 *     model: string,
 *     as: string,
 *     attributes: Array<string>
 *   }>
 * }} options
 */

const getList = async (options) => {
  const query = new SearchBuilder({
    pagination: options.pagination,
    sort: options.sort,
    filter: options.filter,
    include: options.include,
  }).buildQuery();

  query.order.push([{ model: db.user, as: 'user' }, 'id']);
  query.order.push([{ model: db.technologies, as: 'technologies' }, 'title']);

  const projects = await db.project.findAll({
    ...query,
  });

  const rows = await db.project.count();
  return { data: projects };
};

const getTech = async (options) => {
  const query = new SearchBuilder({
    // pagination: options.pagination,
    // sort: options.sort,
    // filter: options.filter,
    include: options.include,
  }).buildQuery();

  // query.order.push([{ model: db.user, as: 'user' }, 'id']);
  // query.order.push([{ model: db.technologies, as: 'technologies' }, 'title']);

  const tech = await db.techGroup.findAll({
    ...query,
    // include,
  });

  // const rows = await db.project.count();
  return { data: tech };
};

/**
 * @param {{
 * title: string,
 * images: Array<string>,
 * href: string,
 * description: string,
 * description_ru: string,
 * status: string,
 * role: Array<JSON>,
 * user: Array<number> | [],
 * technologyies: Array<number> | [],
 * id: number,
 * }} data
 */

const edit = async (data) => {
  const roles = JSON.parse(data.role);
  const resultData = { ...data };
  resultData.role = roles;
  await db.project.update({
    title: resultData.title,
    href: resultData.href,
    description: resultData.description,
    description_ru: resultData.description_ru,
    role: resultData.role,
  }, {
    where: { id: resultData.id },
  });
  const editProject = await db.project.findOne({
    where: { id: data.id },
  });
  await editProject.setTechnologies(data.technologies_id);
  await editProject.setUser(data.user_id);
  return editProject.toJSON();
};

const deleteProject = async (id) => {
  const removeProject = await db.project.destroy({ where: { id } });
  return removeProject;
};

module.exports = {
  create,
  getList,
  edit,
  deleteProject,
  getTech,
};
