import GetAllBooksControllerFactory from "./update-recently-viewed-books-controller-factory";
import { GetAllBooksController } from "@/application/controllers";
import { GetAllBooksService } from "@/application/services";
import { GetAllBooksUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

jest.mock("@/application/controllers");
jest.mock("@/application/services");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("BooksControllerFactory", () => {
  it("should create an instance of BooksListController", () => {
    const factory = new GetAllBooksControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetAllBooksService).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetAllBooksService).toHaveBeenCalledTimes(1);

    expect(GetAllBooksUseCase).toHaveBeenCalledWith(
      expect.any(GetAllBooksService)
    );
    expect(GetAllBooksUseCase).toHaveBeenCalledTimes(1);

    expect(GetAllBooksController).toHaveBeenCalledWith(
      expect.any(GetAllBooksUseCase)
    );

    expect(controller).toBeInstanceOf(GetAllBooksController);
  });
});
