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
 * user: Array<number>,
 * technologies: Array<number>,
 * }} data
 */
const create = async (data) => {
  const roles = JSON.parse(data.role);
  data.role = roles;
  const newProject = await db.project.create(data);
  await newProject.setTechnologies(data.technologies_id);
  await newProject.setUser(data.user_id);
  return newProject.toJSON();
};

/**
 * @param {{
    pagination: {
      perPage: number;
      page: number;
      limit: number
      offset: number
    };
    sort: {
      sortBy: string;
      sortDirection: "straight" | "reverse";
    };
    filter: {
    };
    include: Array<{
      model: string,
      as: string,
      attributes: Array<string>
    }>
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
    // include,
  });

  const rows = await db.project.count();
  return { data: projects };
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
  data.role = roles;
  await db.project.update({
    title: data.title,
    href: data.href,
    description: data.description,
    description_ru: data.description_ru,
    role: data.role,
  }, {
    where: { id: data.id },
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
};
