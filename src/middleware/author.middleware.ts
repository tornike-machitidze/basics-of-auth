import { Request, Response, NextFunction } from 'express';

export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user;

  if (currentUser.role !== 'author') {
    return res.status(401).send('Only authors can manage books');
  }

  next();
};
