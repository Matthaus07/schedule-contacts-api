import * as Yup from 'yup';
import Contact from '../models/Contact';
import User from '../models/User';
import Address from '../models/Address';

class ContactsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const contacts = await Contact.findAll({
      where: { user_id: req.userId },
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        // {
        //   model: User,
        //   as: 'user',
        //   attributes: ['id', 'name'],
        // },
        {
          model: Address,
          as: 'address',
          attributes: ['id', 'cep'],
        },
      ],
    });

    return res.json({ contacts });
  }

  async store(req, res) {
    // const schema = Yup.object().shape({
    //   user_id: Yup.number().required(),
    // });
    // if (!(await schema.isValid(req.body)))
    //   return res.status(400).json({ error: 'Validation Fails' });

    const { name, email, phone_number } = req.body;
    const contacts = await Contact.create({
      user_id: req.userId,
      address_id: req.body.address_id,
      name,
      email,
      phone_number,
    });
    return res.json({ contacts });
  }
}

export default new ContactsController();
