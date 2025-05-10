import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByIdUseCase from "./get-book-by-id-usecase";
import { GetBookByPropertyService } from "@/application/services";

describe("BooksListUseCase", () => {
  const bookId = "1234567890";

  it("return a book list with pagination", async () => {
    const expectedResponse = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: 50,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: false,
      data: [makeBookMock()],
    };

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByPropertyService;

    const response = await new GetBookByIdUseCase(
      getAllBooksServiceMock
    ).execute({ id: bookId });

    expect(response).toBe(expectedResponse);
  });

  it("returna error when no book list is empty", async () => {
    const expectedResponse = null;

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByPropertyService;

    const response = await new GetBookByIdUseCase(
      getAllBooksServiceMock
    ).execute({ id: bookId });

    expect(response).toStrictEqual({
      message: "No book found.",
    });
  });
});
