import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface ICurrentUser {
  id: string;
  email: string;
  role: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Token is required!');
  }

  const [tockenType, token] = authHeader.split(' ');

  if (tockenType !== 'Bearer') {
    return res.status(403).send('Invalid token');
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as ICurrentUser;

    req.user = user;
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};
