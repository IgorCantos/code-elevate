import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import GetAllBooksController from "./get-books-controller";
import { makeBookMock } from "@/__mocks__/book-mock";
import { GetAllBooksUseCase } from "@/application/use-cases";
import { HttpError } from "@/application/exceptions";

describe("GetAllBooksController", () => {
  let getAllBooksUseCase: GetAllBooksUseCase;
  let booksController: GetAllBooksController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    getAllBooksUseCase = {
      execute: jest.fn(),
    } as unknown as GetAllBooksUseCase;

    booksController = new GetAllBooksController(getAllBooksUseCase);

    mockRequest = {
      query: {
        page: 1,
        limit: 10,
      },
    } as unknown as FastifyRequest;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("return a successful response when getAllBooksUseCase resolves", async () => {
    const mockResponse = [makeBookMock()];
    (getAllBooksUseCase.execute as jest.Mock).mockResolvedValue(mockResponse);

    await booksController.execute(mockRequest, mockReply);

    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error without message and status code response when getAllBooksUseCase rejects", async () => {
    const mockError = new Error();
    (getAllBooksUseCase.execute as jest.Mock).mockRejectedValue(mockError);

    await booksController.execute(mockRequest, mockReply);

    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  it("return an error with message and status code  when getAllBooksUseCase rejects", async () => {
    const mockError = new HttpError("Not found error", HttpStatus.NOT_FOUND);
    (getAllBooksUseCase.execute as jest.Mock).mockRejectedValue(mockError);

    await booksController.execute(mockRequest, mockReply);

    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});
