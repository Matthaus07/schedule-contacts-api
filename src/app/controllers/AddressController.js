import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    // const { cep, country } = req.body;
    const address = await Address.findAll();
    res.json()
  }
}

export default new AddressController();
