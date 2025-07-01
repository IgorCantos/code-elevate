import GetRecentlyViewedBooksControllerFactory from "./get-recently-viewed-books-controller-factory";
import { RedisRepository } from "@/infraestructure/cache";
import { GetRecentlyViewedBooksUseCase } from "@/application/use-cases";
import { GetRecentlyViewedBooksController } from "@/application/controllers";

jest.mock("@/application/controllers");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/cache");
jest.mock("ioredis");

describe("GetRecentlyViewedBooksControllerFactory", () => {
  it("should create an instance of GetRecentlyViewedBooksControllerFactory", () => {
    const factory = new GetRecentlyViewedBooksControllerFactory();
    const controller = factory.create();

    expect(RedisRepository).toHaveBeenCalledTimes(1);

    expect(GetRecentlyViewedBooksUseCase).toHaveBeenCalledWith(
      expect.any(RedisRepository)
    );
    expect(GetRecentlyViewedBooksUseCase).toHaveBeenCalledTimes(1);

    expect(GetRecentlyViewedBooksController).toHaveBeenCalledWith(
      expect.any(GetRecentlyViewedBooksUseCase)
    );

    expect(controller).toBeInstanceOf(GetRecentlyViewedBooksController);
  });
});
