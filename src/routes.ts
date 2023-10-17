import { Express } from 'express';
import userRouter from './controller/user.controller';

const setupRoutes = (app: Express) => {
  app.use('/api/user', userRouter);
};

export default setupRoutes;
