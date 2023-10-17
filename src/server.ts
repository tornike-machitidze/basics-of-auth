import dotenv from 'dotenv';
import express, { Express } from 'express';
import { connectToMongoDB } from './config/database';

export async function bootstrap(): Promise<Express> {
  // use .env file to configure environment variables
  dotenv.config();

  // connect to database
  await connectToMongoDB();

  const app = express();

  app.use(express.json());

  return app;
}
