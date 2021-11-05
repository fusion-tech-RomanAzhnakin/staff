import PropTypes from 'prop-types';

import { userRoles, userStatuses, userTechRoles } from './constants';

export const UserType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  firstName_ru: PropTypes.string,
  lastName_ru: PropTypes.string,
  login: PropTypes.string,
  info: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.oneOf(userRoles),
  tech_role: PropTypes.oneOf(userTechRoles),
  avatar: PropTypes.string,
  avatarThumbnail: PropTypes.string,
  status: PropTypes.oneOf(userStatuses),
  DoB: PropTypes.string,
  slack_name: PropTypes.string,
  resetPasswordToken: PropTypes.string,
  resetPasswordExpires: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  slack_conversational_id: PropTypes.string,
  slack_conversational_crm_id: PropTypes.string,
  repo: PropTypes.arrayOf(PropTypes.string),
  isDev: PropTypes.boolean,
});

export const SkillType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.oneOf(['junior', 'middle', 'senior']),
});

export const OpenSkillType = PropTypes.shape({
  id: PropTypes.number,
  groupIndex: PropTypes.number,
  sectionIndex: PropTypes.number,
  skillIndex: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.oneOf(['junior', 'middle', 'senior']),
});

export const SelectedUserType = PropTypes.shape({
  value: PropTypes.number,
  label: PropTypes.string,
});

export const UsersType = PropTypes.arrayOf(
  PropTypes.shape({
    avatar: PropTypes.string,
    avatarThumbnail: PropTypes.string,
    education: PropTypes.text,
    education_ru: PropTypes.text,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.number,
    lastName: PropTypes.string,
    login: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.oneOf(userRoles),
    status: PropTypes.oneOf(userStatuses),
  })
);

export const TasksType = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
  })
);

export const ExtraType = PropTypes.shape({
  id: PropTypes.number,
  date: PropTypes.string,
  description: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  isProcessed: PropTypes.bool,
  project_id: PropTypes.number,
  user_id: PropTypes.number,
  user: PropTypes.UserType,
});

export const PlanTaskJobType = PropTypes.shape({
  createdAt: PropTypes.string,
  finishTask: PropTypes.string,
  id: PropTypes.number,
  plan_id: PropTypes.number,
  startTask: PropTypes.string,
  status: PropTypes.string,
  taskJob_id: PropTypes.number,
  updatedAt: PropTypes.string,
});
