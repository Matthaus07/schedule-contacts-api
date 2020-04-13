import Sequelize, { Model } from 'sequelize';

class AddressTable extends Model {
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
}
export default AddressTable;
