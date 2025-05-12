import { makeBookMock } from "@/__mocks__/book-mock";
import { GetBookByPropertyService } from "@/application/services";
import GetBookByPropertyUseCase from "./get-book-by-property-usecase";

describe("BooksListUseCase", () => {
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

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByPropertyService;

    const page = 1;
    const limit = 10;

    const response = await new GetBookByPropertyUseCase(
      getAllBooksServiceMock
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

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByPropertyService;

    const page = null as unknown as number;
    const limit = null as unknown as number;

    const response = await new GetBookByPropertyUseCase(
      getAllBooksServiceMock
    ).execute({ page, limit, genre: bookMock.genre });

    expect(response).toBe(expectedResponse);
  });

  it("returna error when no book list is empty", async () => {
    const expectedResponse = null;

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByPropertyService;

    const page = 1;
    const limit = 10;

    const response = await new GetBookByPropertyUseCase(
      getAllBooksServiceMock
    ).execute({ page, limit, genre: bookMock.genre });

    expect(response).toStrictEqual({
      message: "No book found.",
    });
  });
});
