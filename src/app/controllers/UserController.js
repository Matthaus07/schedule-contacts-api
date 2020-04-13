import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      phone_number: Yup.string().required().min(8),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: 'Validation Fails' });

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist)
      return res.status(400).json({ error: 'O usuário já existe' });

    const { name, email, phone_number } = await User.create(req.body);

    return res.json({
      name,
      email,
      phone_number,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: 'Validation Fails' });

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return res.status(400).json({ error: 'O usuário já existe' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não existe' });
    }
    const { id, name, phone_number, address_id } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      phone_number,
      address_id,
    });
  }
}

export default new UserController();
