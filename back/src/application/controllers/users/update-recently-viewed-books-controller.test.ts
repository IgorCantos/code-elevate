import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "@/infraestructure/utils/http-status";
import UpdateRecentlyViewedBooksController from "./update-recently-viewed-books-controller";
import { UpdateRecentlyViewedBooksUseCase } from "@/domain/use-cases";

describe("UpdateRecentlyViewedBooksController", () => {
  let updateRecentlyViewedBooksUseCase: UpdateRecentlyViewedBooksUseCase;
  let controller: UpdateRecentlyViewedBooksController;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    updateRecentlyViewedBooksUseCase = {
      execute: jest.fn(),
    } as unknown as UpdateRecentlyViewedBooksUseCase;

    controller = new UpdateRecentlyViewedBooksController(
      updateRecentlyViewedBooksUseCase
    );

    mockRequest = {
      params: { userId: "123" },
      body: { data: { bookId: "456" } },
    } as unknown as FastifyRequest;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("should return a successful response when use case resolves", async () => {
    await controller.execute(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.NO_CONENT);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "User recently viewed books updated successfully.",
    });
  });

  it("should return an error response when use case rejects", async () => {
    const mockError = new Error("Database error");
    (updateRecentlyViewedBooksUseCase.execute as jest.Mock).mockRejectedValue(
      mockError
    );

    await controller.execute(mockRequest, mockReply);

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
