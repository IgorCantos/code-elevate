import BooksControllerFactory from "./make-get-books-list-controller";
import { BooksListController } from "@/application/controllers";
import { BooksListService } from "@/application/services";
import { BooksListUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

jest.mock("@/application/controllers");
jest.mock("@/application/services");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("BooksControllerFactory", () => {
  it("should create an instance of BooksListController", () => {
    const factory = new BooksControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(BooksListService).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(BooksListService).toHaveBeenCalledTimes(1);

    expect(BooksListUseCase).toHaveBeenCalledWith(expect.any(BooksListService));
    expect(BooksListUseCase).toHaveBeenCalledTimes(1);

    expect(BooksListController).toHaveBeenCalledWith(
      expect.any(BooksListUseCase)
    );

    expect(controller).toBeInstanceOf(BooksListController);
  });
});
