import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import GetBookByAuthorController from "./get-book-by-author-controller";
import { makeBookMock } from "@/__mocks__/book-mock";
import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import { HttpError } from "@/domain/exceptions";

describe("GetBookByAuthorController", () => {
  let getBookByPropertyUseCase: GetBookByPropertyUseCase;
  let booksController: GetBookByAuthorController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    getBookByPropertyUseCase = {
      execute: jest.fn(),
    } as unknown as GetBookByPropertyUseCase;

    booksController = new GetBookByAuthorController(getBookByPropertyUseCase);

    mockRequest = {
      query: {
        page: 1,
        limit: 10,
      },
      params: {
        bookId: "1234567890",
      },
    } as unknown as FastifyRequest;
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("return a successful response when GetBookByAuthorController resolves", async () => {
    const mockResponse = [makeBookMock()];
    (getBookByPropertyUseCase.execute as jest.Mock).mockResolvedValue(
      mockResponse
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByPropertyUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error response when GetBookByAuthorController rejects", async () => {
    const mockError = new Error();
    (getBookByPropertyUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByPropertyUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  it("return an error with message and status code  when getBookByPropertyUseCase rejects", async () => {
    const mockError = new HttpError("Not found error", HttpStatus.NOT_FOUND);
    (getBookByPropertyUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByPropertyUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});
