import { Express } from 'express';
import userRouter from './controller/user.controller';

const setupRoutes = (app: Express) => {
  app.use('/api/register', userRouter);
};

export default setupRoutes;
