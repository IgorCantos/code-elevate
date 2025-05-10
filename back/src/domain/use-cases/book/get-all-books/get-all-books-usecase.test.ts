import { makeBookMock } from "@/__mocks__/book-mock";
import GetAllBooksUseCase from "./get-all-books-usecase";

describe("BooksListUseCase", () => {
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
    };

    const response = await new GetAllBooksUseCase(
      getAllBooksServiceMock
    ).execute();

    expect(response).toBe(expectedResponse);
  });

  it("returna error when no book list is empty", async () => {
    const expectedResponse = {
      actualPage: 1,
      limitePerPage: 10,
      totalDocuments: 50,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: false,
      data: [],
    };

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    };

    const response = await new GetAllBooksUseCase(
      getAllBooksServiceMock
    ).execute();

    expect(response).toStrictEqual({
      message: "No books found.",
    });
  });
});
