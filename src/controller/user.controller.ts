import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/user.model';

const router = Router();

/**
 * /api/register
 * create / sign up logic
 *
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, isAuthor, password } = req.body;

    if (!(email && password && last_name && first_name)) {
      return res.status(400).send('All input is required!');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const ecryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: ecryptedPassword,
      role: isAuthor === true ? 'author' : 'reader',
    });

    res.status(201).send('User successfully registereds');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
