/* eslint-disable no-unused-vars */

const tableName = 'messages_users';
const constraintName = 'messages_users_message_id_fkey';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query(`alter table "${tableName}" drop constraint "${constraintName}" `)
    .then(() => queryInterface.sequelize
      .query(`alter table "${tableName}" add constraint "${constraintName}"
        foreign key("message_id") references "messages" ("id") on delete cascade on update cascade`)),

  down: (queryInterface, Sequelize) => queryInterface.sequelize
    .query(`alter table "${tableName}" drop constraint "${constraintName}" `)
    .then(() => queryInterface.sequelize
      .query(`alter table "${tableName}" add constraint "${constraintName}" 
        foreign key("message_id") references "messages" ("id") on delete no action on update no action`)),
};
