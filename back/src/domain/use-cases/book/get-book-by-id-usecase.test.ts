import { makeBookMock } from "@/__mocks__/book-mock";
import GetBookByIdUseCase from "./get-book-by-id-usecase";
import { GetBookByIdService } from "@/application/services";

describe("GetBookByIdUseCase", () => {
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

    const getBookByIdServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByIdService;

    const response = await new GetBookByIdUseCase(
      getBookByIdServiceMock
    ).execute({ id: bookId });

    expect(response).toBe(expectedResponse);
  });

  it("returna error when no book list is empty", async () => {
    const expectedResponse: [] = [];

    const getBookByIdServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetBookByIdService;

    const getBookByIdUseCase = new GetBookByIdUseCase(getBookByIdServiceMock);

    await expect(getBookByIdUseCase.execute({ id: bookId })).rejects.toThrow(
      "No books found."
    );
  });
});
