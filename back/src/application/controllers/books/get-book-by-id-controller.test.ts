import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import GetBookByIdController from "./get-book-by-id-controller";
import { makeBookMock } from "@/__mocks__/book-mock";
import { GetBookByIdUseCase } from "@/application/use-cases";
import { HttpError } from "@/application/exceptions";

describe("GetBookByIdController", () => {
  let getBookByIdUseCase: GetBookByIdUseCase;
  let booksController: GetBookByIdController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    getBookByIdUseCase = {
      execute: jest.fn(),
    } as unknown as GetBookByIdUseCase;

    booksController = new GetBookByIdController(getBookByIdUseCase);

    mockRequest = {
      params: {
        bookId: "1234567890",
      },
    } as FastifyRequest;
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("return a successful response when getBookByIdUseCase resolves", async () => {
    const mockResponse = [makeBookMock()];
    (getBookByIdUseCase.execute as jest.Mock).mockResolvedValue(mockResponse);

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByIdUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error response when getBookByIdUseCase rejects", async () => {
    const mockError = new Error();
    (getBookByIdUseCase.execute as jest.Mock).mockRejectedValue(mockError);

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByIdUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  it("return an error with message and status code  when getBookByIdUseCase rejects", async () => {
    const mockError = new HttpError("Not found error", HttpStatus.NOT_FOUND);
    (getBookByIdUseCase.execute as jest.Mock).mockRejectedValue(mockError);

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByIdUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});
