import { Book, IBook } from "@/domain";

class BooksListService {
  constructor() {}

  async get(): Promise<IBook[] | []> {
    const book = [
      new Book({
        id: "1",
        name: "teste",
        weight: 54,
        destination: "rfhdf",
      }),
    ];

    return book;
  }
}

export default BooksListService;
