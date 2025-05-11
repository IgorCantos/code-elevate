import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByIdService from "./get-book-by-id-service";

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

    const service = new GetBookByIdService(mockBooksRepository);
    const response = await service.execute({ id: bookMock._id });

    expect(response).toBe(bookMock);
  });
});
