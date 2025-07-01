import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import { makeBookMock } from "@/__mocks__/book-mock";
import GetRecentlyViewedBooksController from "./get-recently-viewed-books-controller";
import { GetRecentlyViewedBooksUseCase } from "@/application/use-cases";

describe("GetRecentlyViewedBooksController", () => {
  let getRecentlyViewedBooksUseCase: GetRecentlyViewedBooksUseCase;
  let booksController: GetRecentlyViewedBooksController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    getRecentlyViewedBooksUseCase = {
      execute: jest.fn(),
    } as unknown as GetRecentlyViewedBooksUseCase;

    booksController = new GetRecentlyViewedBooksController(
      getRecentlyViewedBooksUseCase
    );

    mockRequest = {
      params: { userId: "123" },
    } as unknown as FastifyRequest;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("return a successful response when getRecentlyViewedBooksUseCase resolves", async () => {
    const mockResponse = [makeBookMock()];
    (getRecentlyViewedBooksUseCase.execute as jest.Mock).mockResolvedValue(
      mockResponse
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getRecentlyViewedBooksUseCase.execute).toHaveBeenCalledWith({
      userId: "123",
    });
    expect(getRecentlyViewedBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error response when getRecentlyViewedBooksUseCase rejects", async () => {
    const mockError = new Error("Database error");
    (getRecentlyViewedBooksUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getRecentlyViewedBooksUseCase.execute).toHaveBeenCalledWith({
      userId: "123",
    });
    expect(getRecentlyViewedBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      message:
        "Something unexpected happened while update the user recently viewed books.",
      error: mockError.message,
    });
  });
});
