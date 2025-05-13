import { makeBookMock } from "@/__mocks__/book-mock";
import GetAllBooksUseCase from "./get-all-books-usecase";
import { GetAllBooksService } from "@/application/services";

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
    } as unknown as GetAllBooksService;

    const page = 1;
    const limit = 10;

    const response = await new GetAllBooksUseCase(
      getAllBooksServiceMock
    ).execute({
      page,
      limit,
    });

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
      data: [makeBookMock()],
    };

    const getAllBooksServiceMock = {
      execute: () => Promise.resolve(expectedResponse),
    } as unknown as GetAllBooksService;

    const page = null as unknown as number;
    const limit = null as unknown as number;

    const response = await new GetAllBooksUseCase(
      getAllBooksServiceMock
    ).execute({
      page,
      limit,
    });

    expect(response).toBe(expectedResponse);
  });

  it("return error when book list is empty", async () => {
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
    } as unknown as GetAllBooksService;

    const page = 1;
    const limit = 10;

    const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooksServiceMock);

    await expect(getAllBooksUseCase.execute({ page, limit })).rejects.toThrow(
      "No books found."
    );
  });
});
