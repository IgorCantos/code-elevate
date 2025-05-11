import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByPropertyService from "./get-book-by-property-service";

describe("GetBookByPropertyService", () => {
  it("succesfully retries a books list with pagination", async () => {
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

    const service = new GetBookByPropertyService(mockBooksRepository);
    const response = await service.execute({ genre: bookMock.genre });

    expect(response).toBe(paginatedBooksMocks);
  });
});
