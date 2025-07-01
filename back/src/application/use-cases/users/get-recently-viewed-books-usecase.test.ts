import { ICacheRepository } from "@/domain/repositories";
import GetRecentlyViewedBooksUseCase from "./get-recently-viewed-books-usecase";
import { Book } from "@/domain/entities";
import { makeBookMock } from "@/__mocks__/book-mock";

describe("GetRecentlyViewedBooksUseCase", () => {
  it("should throw an error if userId is not provided", async () => {
    const cacheRepositoryMock = {
      getCache: jest.fn(),
      setCache: jest.fn(),
    } as unknown as ICacheRepository;

    const useCase = new GetRecentlyViewedBooksUseCase(cacheRepositoryMock);

    await expect(useCase.execute({ userId: "" })).rejects.toThrow(
      "User ID is required"
    );
  });

  it("should return an empty array if no cached data is found", async () => {
    const cacheRepositoryMock = {
      getCache: jest.fn().mockResolvedValue([]),
      setCache: jest.fn(),
    } as unknown as ICacheRepository;

    const useCase = new GetRecentlyViewedBooksUseCase(cacheRepositoryMock);

    const result = await useCase.execute({ userId: "123" });

    expect(result).toEqual([]);
    expect(cacheRepositoryMock.getCache).toHaveBeenCalledWith(
      "recently_viewed_books_123"
    );
  });

  it("should return a list of books if cached data is found", async () => {
    const bookMock = makeBookMock();
    const cacheRepositoryMock = {
      getCache: jest.fn().mockResolvedValue([JSON.stringify(bookMock)]),
      setCache: jest.fn(),
    } as unknown as ICacheRepository;

    const useCase = new GetRecentlyViewedBooksUseCase(cacheRepositoryMock);

    const result = await useCase.execute({ userId: "123" });

    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Book);
    expect(result[0]).toMatchObject(bookMock);
    expect(cacheRepositoryMock.getCache).toHaveBeenCalledWith(
      "recently_viewed_books_123"
    );
  });
});
