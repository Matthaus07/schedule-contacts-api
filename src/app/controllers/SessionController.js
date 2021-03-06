import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import confAuth from '../../config/auth';
import User from '../models/User';

class SessionController {
  async verify(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: 'Validation Fails' });
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'A senha não confere' });
    const { id, name, phone_number } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        phone_number,
      },
      token: jwt.sign({ id }, confAuth.secret, {
        expiresIn: confAuth.expiresIn,
      }),
    });
  }
}
export default new SessionController();
