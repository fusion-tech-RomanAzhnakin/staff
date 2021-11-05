/**
 * Create options array for select
 * @param {Array<string>} options
 * @param {{[name: string]:string}} names
 */
const createOptions = (options, names) => options.map((option) => ({
  label: names[option],
  value: option,
}));

export const userRoles = [
  'student',
  'user',
  'hr',
  'sales',
  'admin',
  'mentor',
  'officeManager',
];

export const userRoleNames = {
  student: 'Стажёр',
  user: 'Сотрудник',
  hr: 'HR',
  sales: 'Sales',
  admin: 'Администратор',
  mentor: 'Ментор',
  officeManager: 'Офис менеджер',
};

export const userTechRoles = [
  'admin',
  'sales',
  'techLead',
  'projectManager',
  'developer',
  'designer',
  'qaEngineer',
  'hr',
  'officeManager',
  'englishTeacher',
];

export const userTechRolesNames = {
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

export const userStatuses = ['registered', 'active', 'disabled'];

export const paramsNames = {
  announcementsId: 'announcements-id',
};

export const languages = ['en', 'ru'];

export const languageNames = {
  en: 'English',
  ru: 'Русский',
};

export const languageOptions = createOptions(languages, languageNames);

export const employeePositions = ['developer', 'designer', 'qa', 'pm'];

export const employeePositionNames = {
  developer: 'Developer',
  designer: 'Designer',
  qa: 'QA Engineer',
  pm: 'Project Manager',
};

export const employeePositionOptions = createOptions(
  employeePositions,
  employeePositionNames
);

export const userTechRolesPositionOptions = createOptions(
  userTechRoles,
  userTechRolesNames
);

export const taskJobLevels = [
  'base',
  'medium',
  'final',
  'probation',
];

export const taskJobLevelNames = {
  base: 'Базовый',
  medium: 'Средний',
  final: 'Финальный',
  probation: 'Испытательный',
};

export const taskJobLevelOptions = createOptions(taskJobLevels, taskJobLevelNames);
