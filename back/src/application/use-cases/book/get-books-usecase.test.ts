import { makeBookMock } from "@/__mocks__/book-mock";
import GetAllBooksUseCase from "./get-books-usecase";

describe("GetAllBooksUseCase", () => {
  it("return a book list with pagination", async () => {
    const bookMock = makeBookMock();
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
    const title = "";

    const response = await new GetAllBooksUseCase(booksRepositoryMock).execute({
      page,
      limit,
      title,
    });

    expect(response).toBe(expectedResponse);
  });

  it("return a book list with pagination using default page and limit", async () => {
    const bookMock = makeBookMock();

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
    const title = "";

    const response = await new GetAllBooksUseCase(booksRepositoryMock).execute({
      page,
      limit,
      title,
    });

    expect(response).toBe(expectedResponse);
  });

  it("return error when book list is empty", async () => {
    const bookMock = makeBookMock();

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
    const title = "";

    const getAllBooksUseCase = new GetAllBooksUseCase(booksRepositoryMock);

    await expect(
      getAllBooksUseCase.execute({ page, limit, title })
    ).rejects.toThrow("No books found.");
  });
});
