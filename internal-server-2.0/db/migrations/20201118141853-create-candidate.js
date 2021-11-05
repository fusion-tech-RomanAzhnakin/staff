module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      social: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      job_experience: {
        type: Sequelize.TEXT,
      },
      repo: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      english_level: {
        type: Sequelize.ENUM('beginner', 'elementary', 'intermediate', 'upperIntermediate', 'advanced', 'proficiency'),
      },
      additional_info: {
        type: Sequelize.TEXT,
      },
      army: {
        type: Sequelize.BOOLEAN,
      },
      studying: {
        type: Sequelize.BOOLEAN,
      },
      hr_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      column_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidate_columns',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('candidates');
  },
};
