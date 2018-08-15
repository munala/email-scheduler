module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('jobs', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    finished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('jobs'),
};
