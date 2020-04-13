module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('address', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primariKey: true,
        unique: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      residence_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('address');
  },
};
