import { Document, Types, Schema, Model, model } from 'mongoose';
export interface IBook extends Document {
  _id: Types.ObjectId;
  title: string;
  text: string;
  author_id: string;
}

export const BookScema: Schema<IBook> = new Schema<IBook>({
  title: { type: String, default: null },
  text: { type: String, default: null },
  author_id: { type: String, default: null },
});

const bookModel: Model<IBook> = model<IBook>('Book', BookScema);

export default bookModel;
