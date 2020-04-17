import Sequelize, { Model } from 'sequelize';

class Contacts extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        cep: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        number: Sequelize.STRING,
        state: Sequelize.STRING,
        complement: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
export default Contacts;
