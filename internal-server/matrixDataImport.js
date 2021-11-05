const db = require('./models/index');
const matrixData = require('./matrixData.json');

const setData = (data) => {
  (async (groups) => {
    for (const group of groups) {
      const newGroup = await db.matrix_groups.create({ title: group.title });

      (async (sections) => {
        for (const section of sections) {
          const newSection = await db.matrix_sections.create({
            title: section.title,
            group_id: newGroup.id,
          });

          (async (skills) => {
            for (const skill of skills) {
              await db.matrix_skills.create({
                title: skill.title,
                description: skill.description,
                section_id: newSection.id,
                level: skill.level,
              });
            }
          })(section.skills);
        }
      })(group.sections);
    }
  })(data.groups);
};

setData(matrixData);
