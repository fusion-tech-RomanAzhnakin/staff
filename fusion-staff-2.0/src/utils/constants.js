import React from 'react';
import { constantsToSelectOptions } from './arrayToSelectOptions';
import { getRandomListItem } from './utils';

const authSubroute = 'auth';
const request = 'request';
const sales = 'sales';
const overtime = 'overtime';
const userSubroute = 'user';
export const routePaths = {
  home: '/',
  auth: {
    signIn: `/${authSubroute}/sign-in`,
    signUp: `/${authSubroute}/sign-up`,
    forgotPassword: `/${authSubroute}/forgot-password`,
    resetPassword: `/${authSubroute}/reset-password`,
  },
  common: {
    createRequest: `/${request}/create`,
    createOvertime: `/${overtime}/create`,
    user: {
      list: `/${userSubroute}/list`,
      one: `/${userSubroute}/:id`,
      createLink: (id) => `/${userSubroute}/${id}`,
    },
  },
  admin: {},
  sales: {
    projects: `/${sales}/projects`,
    createProject: `/${sales}/create-project`,
    createPortfolio: `/${sales}/create-portfolio`,
    createCv: `/${sales}/create-cv`,
  },
  hrBoards: '/hr-boards',
  diagram: '/diagram',
  articles: '/articles',
  staff: '/staff',
};

export const userRoles = {
  admin: 'admin',
  sales: 'sales',
  officeManager: 'officeManager',
  hr: 'hr',
  mentor: 'mentor',
  user: 'user',
  student: 'student',
};

export const userRolesRu = {
  admin: 'Админ',
  sales: 'Sales',
  officeManager: 'Офис Менеджер',
  hr: 'HR',
  mentor: 'Наставник',
  user: 'Юзер',
  student: 'Студент',
};

export const userTechRolesRu = {
  admin: 'Администратор',
  sales: 'Сейлз',
  techLead: 'Техлид',
  projectManager: 'Проджект менеджер',
  developer: 'Разработчик',
  designer: 'Дизайнер',
  qaEngineer: 'Тестировщик',
  hr: 'HR',
  officeManager: 'Офис менеджер',
  englishTeacher: 'Преподаватель английского',
};

export const technologiesList = {
  tech1: 'Технология1',
  tech2: 'Технология2',
  tech3: 'Технология3',
};

export const userStatusesRu = {
  registered: 'Зарегестрированный',
  active: 'Активный',
  disabled: 'Отключённый',
};

export const getKey = (enums, value) => {
  return Object.keys(enums).find((key) => enums[key] === value);
};

export const userStatuses = {
  registered: 'registered',
  active: 'active',
  disabled: 'disabled',
};

export const userRolesList = Object.values(userRoles);

export const userStatusesList = Object.values(userStatuses);

export const defaultErrorMessage = 'Что-то пошло не так 😢😢😢';
export const requiredErrorMessage = 'Поле должно быть заполненно';

export const validationErrorName = 'ValidationError';

export const englishOptions = [
  { value: null, label: 'Не указано' },
  { value: 'beginner', label: 'Beginner (A1)' },
  { value: 'elementary', label: 'Elementary (A2)' },
  { value: 'intermediate', label: 'Intermediate (B1)' },
  { value: 'upperIntermediate', label: 'Upper-Intermediate (B2)' },
  { value: 'advanced', label: 'Advanced (C1)' },
  { value: 'proficiency', label: 'Proficiency (C2)' },
];

export const DOB_FORMAT = 'DD MMMM YYYY';

export const REQUEST_TYPES = {
  dayOff: 'dayOff',
  technical: 'technical',
  documents: 'documents',
  common: 'common',
  vacation: 'vacation',
  medical: 'medical',
};

export const REQUEST_TYPES_NAMES = {
  dayOff: 'Отгул',
  technical: 'Технический',
  documents: 'Документы',
  common: 'Бытовой',
  vacation: 'Отпуск',
  medical: 'Больничный',
};

export const REQUEST_STATUSES = {
  wait: 'wait',
  completed: 'completed',
  denied: 'denied',
  inProgress: 'inProgress',
  accept: 'accept',
};

export const REQUEST_STATUS_NAMES = {
  wait: 'Ожидает рассмотрения',
  inProgress: 'Выполняется',
  accept: 'Одобрена',
  completed: 'Выполнена',
  denied: 'Отклонена',
};

export const optionType = constantsToSelectOptions(
  REQUEST_TYPES,
  REQUEST_TYPES_NAMES,
);

export const DEFAULT_AVATAR = {
  avocado: require('../ui/images/defaultAvatars/avocado.svg').default, // eslint-disable-line global-require
  batman: require('../ui/images/defaultAvatars/batman.svg').default, // eslint-disable-line global-require
  bear: require('../ui/images/defaultAvatars/bear.svg').default, // eslint-disable-line global-require
  einstein: require('../ui/images/defaultAvatars/einstein.svg').default, // eslint-disable-line global-require
  heisenberg: require('../ui/images/defaultAvatars/heisenberg.svg').default, // eslint-disable-line global-require
  lazybones: require('../ui/images/defaultAvatars/lazybones.svg').default, // eslint-disable-line global-require
  ozzy: require('../ui/images/defaultAvatars/ozzy.svg').default, // eslint-disable-line global-require
  superman: require('../ui/images/defaultAvatars/superman.svg').default, // eslint-disable-line global-require
  trump: require('../ui/images/defaultAvatars/trump.svg').default, // eslint-disable-line global-require
  wonderWomen: require('../ui/images/defaultAvatars/wonder-women.svg').default, // eslint-disable-line global-require
};

export const getDefaultAvatar = () => getRandomListItem(Object.values(DEFAULT_AVATAR));

export const REQUEST_TYPE_COLORS = {
  [REQUEST_TYPES.common]: '#607D8B',
  [REQUEST_TYPES.dayOff]: '#FF9800',
  [REQUEST_TYPES.documents]: '#00BCD4',
  [REQUEST_TYPES.medical]: '#E91E63',
  [REQUEST_TYPES.technical]: '#1976D2',
  [REQUEST_TYPES.vacation]: '#388E3C',
};

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome'); // eslint-disable-line global-require
const { faCogs, faHeartbeat, faFile, faHome, faUmbrellaBeach, faWalking } = require('@fortawesome/free-solid-svg-icons');

const getRequestTypeIcon = (icon) => ((props) => <FontAwesomeIcon {...props} icon={icon} />);

export const REQUEST_TYPE_ICONS = {
  [REQUEST_TYPES.common]: getRequestTypeIcon(faHome),
  [REQUEST_TYPES.dayOff]: getRequestTypeIcon(faWalking),
  [REQUEST_TYPES.documents]: getRequestTypeIcon(faFile),
  [REQUEST_TYPES.medical]: getRequestTypeIcon(faHeartbeat),
  [REQUEST_TYPES.technical]: getRequestTypeIcon(faCogs),
  [REQUEST_TYPES.vacation]: getRequestTypeIcon(faUmbrellaBeach),
};

export const REQUEST_STATUS_COLORS = {
  [REQUEST_STATUSES.accept]: '#388E3C',
  [REQUEST_STATUSES.completed]: '#388E3C',
  [REQUEST_STATUSES.denied]: '#FF5252',
  [REQUEST_STATUSES.inProgress]: '#0288D1',
  [REQUEST_STATUSES.wait]: '#9E9E9E',
};

const CheckCircle = require('@material-ui/icons/CheckCircle').default;
const Cancel = require('@material-ui/icons/Cancel').default;
const WatchLater = require('@material-ui/icons/WatchLater').default;
const PauseCircleFilled = require('@material-ui/icons/PauseCircleFilled').default;

const getRequestStatusIcon = (Icon) => ((props) => <Icon {...props} />);

export const REQUEST_STATUS_ICONS = {
  [REQUEST_STATUSES.accept]: getRequestStatusIcon(CheckCircle),
  [REQUEST_STATUSES.completed]: getRequestStatusIcon(CheckCircle),
  [REQUEST_STATUSES.denied]: getRequestStatusIcon(Cancel),
  [REQUEST_STATUSES.inProgress]: getRequestStatusIcon(WatchLater),
  [REQUEST_STATUSES.wait]: getRequestStatusIcon(PauseCircleFilled),
};
