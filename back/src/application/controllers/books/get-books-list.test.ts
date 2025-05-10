import { FastifyReply, FastifyRequest } from "fastify";
import { BooksListUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import BooksListController from "./get-books-list";
import { makeBookMock } from "@/__mocks__/book-mock";

describe("BooksListController", () => {
  let booksListUseCase: BooksListUseCase;
  let booksListController: BooksListController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    booksListUseCase = {
      execute: jest.fn(),
    } as unknown as BooksListUseCase;

    booksListController = new BooksListController(booksListUseCase);

    mockRequest = {} as FastifyRequest;
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("return a successful response when booksListUseCase resolves", async () => {
    const mockResponse = [makeBookMock()];
    (booksListUseCase.execute as jest.Mock).mockResolvedValue(mockResponse);

    await booksListController.getBooksList(mockRequest, mockReply);

    expect(booksListUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error response when booksListUseCase rejects", async () => {
    const mockError = new Error("Database error");
    (booksListUseCase.execute as jest.Mock).mockRejectedValue(mockError);

    await booksListController.getBooksList(mockRequest, mockReply);

    expect(booksListUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Something unexpected happened while retrieving the books list.",
      error: mockError.message,
    });
  });
});
