import { makeBookMock } from "@/__mocks__/book-mock";
import GetBestSellersBooksUseCase from "./get-best-sellers-books-usecase";

describe("GetBestSellersBooksUseCase", () => {
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
      getAllBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const page = 1;
    const limit = 10;

    const response = await new GetBestSellersBooksUseCase(
      booksRepositoryMock
    ).execute({
      page,
      limit,
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
      getAllBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const page = null as unknown as number;
    const limit = null as unknown as number;

    const response = await new GetBestSellersBooksUseCase(
      booksRepositoryMock
    ).execute({
      page,
      limit,
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
      getAllBooks: () => Promise.resolve(expectedResponse),
      getBookById: () => Promise.resolve(bookMock),
      getBookByProperty: () => Promise.resolve(expectedResponse),
      getBestSellersBooks: () => Promise.resolve(expectedResponse),
    };

    const page = 1;
    const limit = 10;

    const getBestSellersBooksUseCase = new GetBestSellersBooksUseCase(
      booksRepositoryMock
    );

    await expect(
      getBestSellersBooksUseCase.execute({ page, limit })
    ).rejects.toThrow("No books found.");
  });
});
