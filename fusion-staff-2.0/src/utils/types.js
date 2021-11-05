import PropTypes from 'prop-types';

import { userRolesList, userStatusesList } from './constants';

export const UserType = PropTypes.shape({
  avatar: PropTypes.string,
  avatarThumbnail: PropTypes.string,
  createdAt: PropTypes.string,
  dob: PropTypes.string,
  educationEn: PropTypes.string,
  educationRu: PropTypes.string,
  email: PropTypes.string,
  firstNameEn: PropTypes.string,
  firstNameRu: PropTypes.string,
  id: PropTypes.number,
  info: PropTypes.string,
  lastNameEn: PropTypes.string,
  lastNameRu: PropTypes.string,
  login: PropTypes.string,
  phone: PropTypes.string,
  repo: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.oneOf([null])]),
  slackName: PropTypes.string,
  status: PropTypes.oneOf(userStatusesList),
  role: PropTypes.oneOf(userRolesList),
});

export const CrmTaskType = PropTypes.shape({
  additional_info_data: PropTypes.arrayOf(PropTypes.string),
  additional_info_field: PropTypes.arrayOf(PropTypes.string),
  archive: PropTypes.bool,
  budget: PropTypes.string,
  comment: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  lid_company: PropTypes.string,
  lid_contact_name: PropTypes.string,
  lid_email: PropTypes.string,
  lid_phone: PropTypes.string,
  lid_skype: PropTypes.string,
  lid_time_zone: PropTypes.number,
  project_folder_path: PropTypes.string,
  proposal_link: PropTypes.string,
  subscription: PropTypes.arrayOf([PropTypes.number]),
  task_in_column: PropTypes.number,
  technologies: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
});

export const RequestType = PropTypes.shape({
  title: PropTypes.string,
  dateFrom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
  dateTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
  date: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  status: PropTypes.string,
  rest_days_number: PropTypes.number,
});

export const RouterPropType = PropTypes.objectOf(PropTypes.any);

export const SelectOptionType = PropTypes.shape({
  label: PropTypes.node,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
});

export const ArticleType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  added_by: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
});
