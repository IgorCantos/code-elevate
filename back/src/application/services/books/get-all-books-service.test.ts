import { makeBookMock } from "@/__mocks__/book-mock";
import GetAllBooksService from "./get-all-books-service";
import { IBookRepository } from "@/domain/repositories";

describe("GetAllBooksService", () => {
  it("succesfully retries a books list with pagination", async () => {
    const booksMock = [makeBookMock()];

    const expectedResponse = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: booksMock.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      data: booksMock,
    };

    const mockBooksRepository: IBookRepository = {
      getAllBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve([]),
      getBookByProperty: () => Promise.resolve(expectedResponse),
    };

    const page = 1;
    const limit = 10;

    const service = new GetAllBooksService(mockBooksRepository);
    const response = await service.execute({
      page,
      limit,
    });

    expect(response).toBe(expectedResponse);
  });
});
