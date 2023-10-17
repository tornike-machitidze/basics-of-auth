import { Express } from 'express';
import userRouter from './controller/user.controller';
import { ICurrentUser } from './middleware/auth.middleware';
import { verifyToken } from './middleware/auth.middleware';
declare global {
  namespace Express {
    interface Request {
      user: ICurrentUser;
    }
  }
}

const setupRoutes = (app: Express) => {
  app.use('/user', userRouter);

  app.use('/api', verifyToken);
};

export default setupRoutes;
