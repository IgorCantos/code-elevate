import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByPropertyService from "./get-book-by-property-service";

describe("GetBookByPropertyService", () => {
  it("succesfully retries a books list with pagination filtered by genre", async () => {
    const bookMock = makeBookMock();
    const paginatedBooksMocks = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: [bookMock].length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      data: [bookMock],
    };

    const mockBooksRepository = {
      getAllBooks: () => Promise.resolve(paginatedBooksMocks),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(paginatedBooksMocks),
    };

    const page = 1;
    const limit = 10;
    const service = new GetBookByPropertyService(mockBooksRepository);
    const response = await service.execute({
      page,
      limit,
      genre: bookMock.genre,
    });

    expect(response).toBe(paginatedBooksMocks);
  });

  it("succesfully retries a books list with pagination filtered by author", async () => {
    const bookMock = makeBookMock();
    const paginatedBooksMocks = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: [bookMock].length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      data: [bookMock],
    };

    const mockBooksRepository = {
      getAllBooks: () => Promise.resolve(paginatedBooksMocks),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(paginatedBooksMocks),
    };

    const page = 1;
    const limit = 10;

    const service = new GetBookByPropertyService(mockBooksRepository);
    const response = await service.execute({
      page,
      limit,
      authors: bookMock.authors,
    });

    expect(response).toBe(paginatedBooksMocks);
  });
});
