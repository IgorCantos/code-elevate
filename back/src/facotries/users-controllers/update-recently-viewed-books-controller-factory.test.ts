import UpdateRecentlyViewedBooksControllerFactory from "./update-recently-viewed-books-controller-factory";
import { UpdateRecentlyViewedBooksController } from "@/application/controllers";
import { UpdateRecentlyViewedBooksUseCase } from "@/domain/use-cases";
import { RedisRepository } from "@/infraestructure/cache";

jest.mock("@/application/controllers");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/cache");
jest.mock("ioredis");

describe("UpdateRecentlyViewedBooksControllerFactory", () => {
  it("should create an instance of UpdateRecentlyViewedBooksControllerFactory", () => {
    const factory = new UpdateRecentlyViewedBooksControllerFactory();
    const controller = factory.create();

    expect(RedisRepository).toHaveBeenCalledTimes(1);

    expect(UpdateRecentlyViewedBooksUseCase).toHaveBeenCalledWith(
      expect.any(RedisRepository)
    );
    expect(UpdateRecentlyViewedBooksUseCase).toHaveBeenCalledTimes(1);

    expect(UpdateRecentlyViewedBooksController).toHaveBeenCalledWith(
      expect.any(UpdateRecentlyViewedBooksUseCase)
    );

    expect(controller).toBeInstanceOf(UpdateRecentlyViewedBooksController);
  });
});
