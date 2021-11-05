module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'tech_role', {
    type: Sequelize.ENUM('admin', 'sales', 'techLead', 'projectManager', 'developer', 'designer', 'qaEngineer', 'hr', 'officeManager', 'englishTeacher'),
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('users', 'tech_role', {
    type: Sequelize.ENUM('admin', 'sales', 'techLead', 'projectManager', 'developer', 'designer', 'qaEngineer', 'hr', 'officeManager', 'englishTeacher'),
  }).then(() => queryInterface.sequelize.query('drop type enum_users_tech_role;')),
};
