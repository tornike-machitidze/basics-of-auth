import { Router, Request, Response } from 'express';
import Book from '../model/book.model';
import { isAuthor } from '../middleware/author.middleware';
import { isBookAuthor } from '../middleware/bookAuthor.middleware';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const books = await Book.find({});

  return res.status(200).json({ books });
});

router.post('/', isAuthor, async (req: Request, res: Response) => {
  try {
    const { title, text } = req.body;
    const author = req.user;

    // Validate user input
    if (!(title && text)) {
      return res.status(400).send('All input is required');
    }

    const oldBook = await Book.findOne({ title });

    if (oldBook) {
      return res.status(409).send('Book Already Exist.');
    }

    const book = await Book.create({
      title,
      text,
      author_id: author.user_id,
    });

    res.status(201).json({
      book_id: book._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:bookId', isAuthor, isBookAuthor, async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const oldBook = await Book.findById(bookId);
    if (!oldBook) {
      return res.status(404).send('Book was not found!');
    }

    await Book.deleteOne({ _id: bookId });

    res.status(204).send('Book deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error!');
  }
});

export default router;
