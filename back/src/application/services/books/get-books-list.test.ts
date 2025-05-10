import { makeBookMock } from "@/__mocks__/book-mock";
import BooksListService from "./get-books-list.service";
import { IBookRepository } from "@/domain/repositories";

describe("BooksListService", () => {
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
      getBooksList: () => Promise.resolve(expectedResponse),
    };

    const service = new BooksListService(mockBooksRepository);
    const response = await service.getBooksList();

    expect(response).toBe(expectedResponse);
  });
});
