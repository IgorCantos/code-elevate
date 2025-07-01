import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByPropertyUseCase from "./get-book-by-property-usecase";

describe("GetBookByPropertyUseCase", () => {
  const bookMock = makeBookMock();

  it("return a book list with pagination", async () => {
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
      getBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const page = 1;
    const limit = 10;

    const response = await new GetBookByPropertyUseCase(
      booksRepositoryMock
    ).execute({ page, limit, genre: bookMock.genre });

    expect(response).toBe(expectedResponse);
  });

  it("return a book list with pagination using default page and limit", async () => {
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
      getBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const page = null as unknown as number;
    const limit = null as unknown as number;

    const response = await new GetBookByPropertyUseCase(
      booksRepositoryMock
    ).execute({ page, limit, genre: bookMock.genre });

    expect(response).toBe(expectedResponse);
  });

  it("returna error when no book list is empty", async () => {
    const expectedResponse = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: 50,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: false,
      data: [],
    };

    const booksRepositoryMock = {
      getBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const page = 1;
    const limit = 10;

    const getBookByPropertyUseCase = new GetBookByPropertyUseCase(
      booksRepositoryMock
    );

    await expect(
      getBookByPropertyUseCase.execute({ page, limit, genre: bookMock.genre })
    ).rejects.toThrow("No books found.");
  });
});
