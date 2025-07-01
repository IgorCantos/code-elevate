import { GetBestSellersBooksController } from "@/application/controllers";
import { GetBestSellersBooksUseCase } from "@/application/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";
import GetBestSellersBooksControllerFactory from "./get-best-sellers-books-controller-factory";

jest.mock("@/application/controllers");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("GetBestSellersBooksControllerFactory", () => {
  it("should create an instance of GetBestSellersBooksController", () => {
    const factory = new GetBestSellersBooksControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetBestSellersBooksUseCase).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetBestSellersBooksUseCase).toHaveBeenCalledTimes(1);

    expect(GetBestSellersBooksController).toHaveBeenCalledWith(
      expect.any(GetBestSellersBooksUseCase)
    );

    expect(controller).toBeInstanceOf(GetBestSellersBooksController);
  });
});
