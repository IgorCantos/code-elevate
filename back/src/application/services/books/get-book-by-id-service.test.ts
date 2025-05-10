import { makeBookMock } from "@/__mocks__/book-mock";
import { IBookRepository } from "@/domain/repositories";
import GetBookByPropertyService from "./get-book-by-id-service";

describe("BooksListService", () => {
  it("succesfully retries a books list with pagination", async () => {
    const bookMock = makeBookMock();

    const mockBooksRepository: IBookRepository = {
      getAllBooks: () =>
        Promise.resolve({
          actualPage: 1,
          limitePerPage: 10,
          totalDocuments: [bookMock].length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
          data: [bookMock],
        }),
      getBookById: () => Promise.resolve(bookMock),
    };

    const service = new GetBookByPropertyService(mockBooksRepository);
    const response = await service.execute({ id: bookMock._id });

    expect(response).toBe(bookMock);
  });
});
