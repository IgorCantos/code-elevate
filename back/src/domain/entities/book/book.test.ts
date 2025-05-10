import { makeBookDataMock } from "@/__mocks__/book-mock";
import { Book } from "./book";

describe("Book Entity", () => {
  it("create a Book instance with all properties", () => {
    const bookData = makeBookDataMock();
    const book = new Book(bookData);

    expect(book).toBeInstanceOf(Book);
    expect(book._id).toBe(bookData._id);
    expect(book.title).toBe(bookData.title);
    expect(book.author).toBe(bookData.author);
    expect(book.publishedDate).toBe(bookData.publishedDate);
    expect(book.description).toBe(bookData.description);
    expect(book.genre).toBe(bookData.genre);
    expect(book.categorie).toBe(bookData.categorie);
    expect(book.thumbnail).toBe(bookData.thumbnail);
    expect(book.pageCount).toBe(bookData.pageCount);
    expect(book.averageRating).toBe(bookData.averageRating);
    expect(book.amount).toBe(bookData.amount);
    expect(book.currencyCode).toBe(bookData.currencyCode);
  });
});
