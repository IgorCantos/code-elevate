import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByIdUseCase from "./get-book-by-id-usecase";
import { Book } from "@/domain/entities";

describe("GetBookByIdUseCase", () => {
  const bookId = "1234567890";

  it("return a book list with pagination", async () => {
    const bookMock: Book | [] = makeBookMock();

    const expectedResponse = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: 50,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: false,
      data: [bookMock],
    };

    const booksRepositoryMock = {
      getAllBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const response = await new GetBookByIdUseCase(booksRepositoryMock).execute({
      id: bookId,
    });

    expect(response).toBe(bookMock);
  });

  it("return error when books list is empty", async () => {
    const bookMock = makeBookMock();

    const getBookByIdMock: Book | [] = [];
    const mockedPagintedResponse = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: 50,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: false,
      data: [bookMock],
    };

    const booksRepositoryMock = {
      getAllBooks: () => Promise.resolve(mockedPagintedResponse),
      getBookById: () => Promise.resolve(getBookByIdMock),
      getBookByProperty: () => Promise.resolve(mockedPagintedResponse),
      getBestSellersBooks: () => Promise.resolve(mockedPagintedResponse),
    };

    const getBookByIdUseCase = new GetBookByIdUseCase(booksRepositoryMock);

    await expect(getBookByIdUseCase.execute({ id: bookId })).rejects.toThrow(
      "No books found."
    );
  });
});
