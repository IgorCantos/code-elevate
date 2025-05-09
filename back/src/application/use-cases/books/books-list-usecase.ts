import { BooksListService } from "@/application/services";

class BooksListUseCase {
  constructor() {}

  async execute() {
    const booksList = await new BooksListService().get();

    if (!booksList || booksList.length === 0) {
      return {
        message: "No books found.",
      };
    }

    return booksList;
  }
}

export default BooksListUseCase;
