import GetAllBooksControllerFactory from "./get-all-books-controller-factory";
import { GetAllBooksController } from "@/application/controllers";
import { GetAllBooksUseCase } from "@/application/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

jest.mock("@/application/controllers");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("GetAllBooksControllerFactory", () => {
  it("should create an instance of GetAllBooksController", () => {
    const factory = new GetAllBooksControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetAllBooksUseCase).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetAllBooksUseCase).toHaveBeenCalledTimes(1);

    expect(GetAllBooksController).toHaveBeenCalledWith(
      expect.any(GetAllBooksUseCase)
    );

    expect(controller).toBeInstanceOf(GetAllBooksController);
  });
});
