import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../model/user.model';

const router = Router();

/**
 * /api/register
 * create / sign up logic
 *
 */
router.post('/register', async (req: Request, res: Response) => {
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

    const user = await new User({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: ecryptedPassword,
      role: isAuthor === true ? 'author' : 'reader',
    }).save();

    res.status(201).json({
      message: 'User successfully registered',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send('All input is required!');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create a tocken
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
          role: user.role,
        },
        process.env.TOKEN_KEY!,
        { expiresIn: '2h' }
      );

      return res.status(200).json({ token });
    }

    res.status(400).send('Invalid Credentials!');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
