module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contacts', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('contacts', 'user_id');
  },
};
