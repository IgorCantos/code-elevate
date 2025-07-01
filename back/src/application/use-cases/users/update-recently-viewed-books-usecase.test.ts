import UpdateRecentlyViewedBooksUseCase from "./update-recently-viewed-books-usecase";
import { ICacheRepository } from "@/domain/repositories";
import { Book } from "@/domain/entities";
import { makeBookMock } from "@/__mocks__/book-mock";

describe("UpdateRecentlyViewedBooksUseCase", () => {
  let updateRecentlyViewedBooksUseCase: UpdateRecentlyViewedBooksUseCase;
  let mockCacheRepository: jest.Mocked<ICacheRepository>;

  beforeEach(() => {
    mockCacheRepository = {
      setCache: jest.fn(),
      getCache: jest.fn(),
    };
    updateRecentlyViewedBooksUseCase = new UpdateRecentlyViewedBooksUseCase(
      mockCacheRepository
    );
  });

  it("should throw an error if userId is not provided", async () => {
    await expect(
      updateRecentlyViewedBooksUseCase.execute({ userId: "", data: {} })
    ).rejects.toThrow("User ID is required");
  });

  it("should throw an error if data is not provided", async () => {
    await expect(
      updateRecentlyViewedBooksUseCase.execute({ userId: "123", data: null })
    ).rejects.toThrow("Data is required");
  });

  it("should validate the book and set it in the cache", async () => {
    const mockData = makeBookMock();
    const mockUserId = "123";
    const mockBook = new Book(mockData);
    jest.spyOn(Book.prototype, "validate").mockImplementation();

    const cacheKey = `recently_viewed_books_${mockUserId}`;

    await updateRecentlyViewedBooksUseCase.execute({
      userId: mockUserId,
      data: mockData,
    });

    expect(mockBook.validate).toHaveBeenCalled();
    expect(mockCacheRepository.setCache).toHaveBeenCalledWith(
      cacheKey,
      mockBook
    );
  });
});
