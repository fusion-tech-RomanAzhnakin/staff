const db = require('../models');
const SearchBuilder = require('../../utils/SearchBuilder');

/**
 * @param {{
    firstName: string;
    lastName: string;
    social: string[];
    job_experience: string;
    repo: string[];
    english_level: string;
    additional_info: string;
    army: boolean;
    studying: boolean;
    hr_id: number;
    column_id: number;
    technologies: object[];
 * }} data
 */
const create = async (data) => {
  const newCandidate = await db.candidate.create(data);

  await newCandidate.setTechnologies(data.technologies);

  return newCandidate;
};

/**
 * @param {{
    id: number;
    data: {
      firstName: string;
      lastName: string;
      social: string[];
      job_experience: string;
      repo: string[];
      english_level: string;
      additional_info: string;
      army: boolean;
      studying: boolean;
      hr_id: number;
      column_id: number;
      technologies: object[];
    }
 * }} options
 */
const update = async (id, data) => {
  const [, [candidate]] = await db.candidate.update(
    data,
    {
      where: { id },
      returning: true,
    },
    // {
    //   model: db.user,
    //   as: 'subscribers',
    //   attributes: ['id', 'firstName', 'lastName', 'firstName_ru', 'lastName_ru'],
    // },
  );

  if (data.technologies) {
    await db.candidate_technology.destroy({ where: { candidate_id: id } });

    await candidate.setTechnologies(data.technologies);
  }

  return candidate;
};

/**
 * @param {{
    pagination: {
      perPage: string;
      page: string;
    };
    sort: {
      sortBy: string;
      sortDirection: "straight" | "reverse";
    };
    filter: {
    };
 * }} params
 */
const getList = async (params) => {
  const query = new SearchBuilder(params).buildQuery();

  const candidates = await db.candidate.findAll({
    ...query,
    include: [
      {
        model: db.technologies,
        as: 'technologies',
        attributes: ['id', 'title'],
        through: { attributes: [] },
      },
      {
        model: db.user,
        as: 'hr',
      },
      {
        model: db.user,
        as: 'subscribers',
        attributes: ['id'],
        through: { attributes: [] },
      },
    ],
  });

  return candidates;
};

/**
 * @param {{
    id:number
 * }} params
 */
const getOne = async (id) => {
  const candidate = await db.candidate.findByPk(id, {
    include: [
      {
        model: db.technologies,
        as: 'technologies',
        attributes: ['id', 'title'],
        through: { attributes: [] },
      },
      {
        model: db.user,
        as: 'hr',
      },
      {
        model: db.user,
        as: 'subscribers',
        attributes: ['id', 'firstName', 'lastName', 'firstName_ru', 'lastName_ru'],
      },
    ],
  });

  return candidate;
};

/**
 * @param {{
    id:number
 * }} params
 */
const deleteOne = async (id) => {
  const candidate = await db.candidate.destroy({ where: { id } });

  return candidate;
};

module.exports = {
  create,
  update,
  getList,
  getOne,
  deleteOne,
};
