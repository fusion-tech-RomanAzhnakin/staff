module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('crm_tasks', 'dedicated_seller', {
      type: Sequelize.INTEGER,
    })
    .then(async () => queryInterface.sequelize.query('UPDATE public.crm_tasks SET dedicated_seller = InterTable.dedicated_seller FROM(SELECT DISTINCT public.crm_tasks.id, public.users.id as dedicated_seller FROM public."crm_tasks" INNER JOIN public.users ON users.id = any(SUBSCRIPTION) AND "users"."role" = \'sales\') AS InterTable WHERE InterTable.id = public.crm_tasks.id;')),
  down: queryInterface => queryInterface.removeColumn('crm_tasks', 'dedicated_seller'),
};
