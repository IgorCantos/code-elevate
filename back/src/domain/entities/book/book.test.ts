import { makeBookDataMock } from "@/__mocks__/book-mock";
import { Book } from "./book";

describe("Book Entity", () => {
  it("create a Book instance with all properties", () => {
    const bookData = makeBookDataMock() as unknown as Book;

    const book = new Book(bookData);

    expect(book).toBeInstanceOf(Book);
    expect(book._id).toBe(bookData._id);
    expect(book.title).toBe(bookData.title);
    expect(book.author).toBe(bookData.author);
    expect(book.publishedDate).toBe(bookData.publishedDate);
    expect(book.description).toBe(bookData.description);
    expect(book.genre).toBe(bookData.genre);
    expect(book.categories).toBe(bookData.categories);
    expect(book.thumbnail).toBe(bookData.thumbnail);
    expect(book.pageCount).toBe(bookData.pageCount);
    expect(book.averageRating).toBe(bookData.averageRating);
    expect(book.amount).toBe(bookData.amount);
    expect(book.currencyCode).toBe(bookData.currencyCode);
  });

  // it("validate a valid Book instance without throwing errors", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   const book = new Book(bookData);

  //   expect(() => book.validate()).not.toThrow();
  // });

  // it("throw an error if _id is missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData._id = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("ID is required");
  // });

  // it("throw an error if title is missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.title = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Title is required");
  // });

  // it("throw an error if author are missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.author = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Author are required");
  // });

  // it("throw an error if publishedDate is missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.publishedDate = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Published date is required");
  // });

  // it("throw an error if description is missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.description = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Description is required");
  // });

  // it("throw an error if genre is missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.genre = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Genre is required");
  // });

  // it("throw an error if categories are missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.categories = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Categories are required");
  // });

  // it("throw an error if thumbnail is missing", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.thumbnail = "";
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Thumbnail is required");
  // });

  // it("throw an error if pageCount is less than or equal to 0", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.pageCount = 0;
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Page count must be greater than 0");
  // });

  // it("throw an error if averageRating is less than 0", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.averageRating = -1;
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow(
  //     "Average rating must be between 0 and 5"
  //   );
  // });

  // it("throw an error if averageRating is greater than 5", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.averageRating = 6;
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow(
  //     "Average rating must be between 0 and 5"
  //   );
  // });

  // it("throw an error if amount is less than or equal to 0", () => {
  //   const bookData = makeBookDataMock() as unknown as Book;

  //   bookData.amount = 0;
  //   const book = new Book(bookData);

  //   expect(() => book.validate()).toThrow("Amount must be greater than 0");
  // });
});
