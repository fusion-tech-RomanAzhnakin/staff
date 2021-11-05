export const skillLevels = {
  junior: 'junior',
  middle: 'middle',
  senior: 'senior',
};

export const knowledgeLevels = {
  none: 'Не знает',
  low: 'Знаком',
  high: 'Знает',
};

export const selfKnowledgeLevels = {
  none: 'Не знаю',
  high: 'Знаю',
};

export const types = {
  group: 'group',
  section: 'section',
  skill: 'skill',
};

export const skillOptions = Object.values(skillLevels).map((value) => ({
  label: value,
  value,
}));

export const knowledgeOptions = Object.values(knowledgeLevels).map((value) => ({
  label: value,
  value: Object.keys(knowledgeLevels).find((key) => knowledgeLevels[key] === value),
}));

export const selfKnowledgeOptions = Object.keys(selfKnowledgeLevels).map((key) => ({
  label: selfKnowledgeLevels[key],
  value: key,
}));
