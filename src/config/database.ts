import { connect } from 'mongoose';

export const connectToMongoDB = async () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    console.log('Please provide DataBase URI to connect. exiting now...');
    process.exit(1);
  } else {
    try {
      await connect(MONGO_URI);
      console.log('Successfully connected to database');
    } catch (e) {
      console.log('DataBase connection failed. exiting now...');
      console.error(e);
      process.exit(1);
    }
  }
};
