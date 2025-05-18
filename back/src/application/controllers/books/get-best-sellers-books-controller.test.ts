import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import GetBestSellersBooksController from "./get-best-sellers-books-controller";
import { makeBookMock } from "@/__mocks__/book-mock";
import { GetBestSellersBooksUseCase } from "@/domain/use-cases";
import { HttpError } from "@/domain/exceptions";

describe("GetBestSellersBooksController", () => {
  let getBestSellersBooksUseCase: GetBestSellersBooksUseCase;
  let booksController: GetBestSellersBooksController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    getBestSellersBooksUseCase = {
      execute: jest.fn(),
    } as unknown as GetBestSellersBooksUseCase;

    booksController = new GetBestSellersBooksController(
      getBestSellersBooksUseCase
    );

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

  it("return a successful response when getBestSellersBooksUseCase resolves", async () => {
    const mockResponse = [makeBookMock()];
    (getBestSellersBooksUseCase.execute as jest.Mock).mockResolvedValue(
      mockResponse
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBestSellersBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.SUCCESS);
    expect(mockReply.send).toHaveBeenCalledWith(mockResponse);
  });

  it("return an error without message and status code response when getBestSellersBooksUseCase rejects", async () => {
    const mockError = new Error();
    (getBestSellersBooksUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBestSellersBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  it("return an error with message and status code  when getBestSellersBooksUseCase rejects", async () => {
    const mockError = new HttpError("Not found error", HttpStatus.NOT_FOUND);
    (getBestSellersBooksUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await booksController.execute(mockRequest, mockReply);

    expect(getBestSellersBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});
