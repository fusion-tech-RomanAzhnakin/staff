/* eslint-disable no-unused-vars */
const tableName = 'messages';
const constraintName = 'messages_author_id_fkey';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query(`alter table "${tableName}" drop constraint "${constraintName}" `)
    .then(() => queryInterface.sequelize
      .query(`alter table "${tableName}" add constraint "${constraintName}"
        foreign key("author_id") references "users" ("id") on delete cascade on update cascade`)),

  down: (queryInterface, Sequelize) => queryInterface.sequelize
    .query(`alter table "${tableName}" drop constraint "${constraintName}" `)
    .then(() => queryInterface.sequelize
      .query(`alter table "${tableName}" add constraint "${constraintName}" 
        foreign key("author_id") references "users" ("id") on delete no action on update no action`)),
};
