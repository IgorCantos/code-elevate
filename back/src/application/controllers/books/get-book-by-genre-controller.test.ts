import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import GetBookByGenreController from "./get-book-by-genre-controller";
import { makeBookMock } from "@/__mocks__/book-mock";
import { GetBookByPropertyUseCase } from "@/domain/use-cases";

describe("GetBookByGenreController", () => {
  let getBookByPropertyUseCase: GetBookByPropertyUseCase;
  let booksController: GetBookByGenreController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    getBookByPropertyUseCase = {
      execute: jest.fn(),
    } as unknown as GetBookByPropertyUseCase;

    booksController = new GetBookByGenreController(getBookByPropertyUseCase);

    mockRequest = {
      headers: {
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

  it("return a successful response when getBookByIdUseCase resolves", async () => {
    const mockResponse = [makeBookMock()];
    (getBookByPropertyUseCase.execute as jest.Mock).mockResolvedValue(
      mockResponse
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByPropertyUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error response when getBookByIdUseCase rejects", async () => {
    const mockError = new Error("Database error");
    (getBookByPropertyUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBookByPropertyUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});
