import { Request, Response, NextFunction } from 'express';
import Book from '../model/book.model';

export const isBookAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;

    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      return res.status(404).send('book was not found!');
    }

    if (foundBook.author_id !== req.user.user_id) {
      return res.status(401).send('This book is relared to another author');
    }

    req.book = foundBook;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
