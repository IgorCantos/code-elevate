import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import GetAllBooksController from "./get-all-books-controller";
import { makeBookMock } from "@/__mocks__/book-mock";
import { GetAllBooksUseCase } from "@/domain/use-cases";

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
      headers: {
        page: "1",
        limit: "10",
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

  it("return an error response when getAllBooksUseCase rejects", async () => {
    const mockError = new Error("Database error");
    (getAllBooksUseCase.execute as jest.Mock).mockRejectedValue(mockError);

    await booksController.execute(mockRequest, mockReply);

    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Something unexpected happened while retrieving the books list.",
      error: mockError.message,
    });
  });
});
