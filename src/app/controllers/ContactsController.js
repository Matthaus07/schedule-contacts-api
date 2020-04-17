import * as Yup from 'yup';
import Contact from '../models/Contact';
import User from '../models/User';

class ContactsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const contacts = await Contact.findAll({
      where: { user_id: req.userId },
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json({ contacts });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      // phone_number: Yup.string().required().min(8),
      phone_number: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: 'Validation Fails' });

    const {
      name,
      email,
      phone_number,
      cep,
      address,
      city,
      state,
      complement,
      number,
    } = req.body;
    const contacts = await Contact.create({
      user_id: req.userId,
      name,
      email,
      phone_number,
      cep,
      address,
      city,
      state,
      complement,
      number,
    });
    return res.json({ contacts });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: 'Validation Fails' });

    const { email } = req.body;

    const { id, name, phone_number } = await Contact.update(req.body, {
      where: { email },
    });

    const userExists = await Contact.findOne({ where: { email } });

    if (!userExists)
      return res.status(400).json({ error: 'O usuário não existe' });

    return res.json({
      id,
      name,
      email,
      phone_number,
    });
  }
}

export default new ContactsController();
