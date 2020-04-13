import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        street: Sequelize.STRING,
        district: Sequelize.STRING,
        residence_number: Sequelize.NUMBER,
        country: Sequelize.STRING,
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
    this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' });
  }
}
export default Address;
