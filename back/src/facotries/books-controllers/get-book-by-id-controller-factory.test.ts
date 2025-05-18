import GetBookByIdControllerFactory from "./get-book-by-id-controller-factory";
import { GetBookByIdController } from "@/application/controllers";
import { GetBookByIdUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

jest.mock("@/application/controllers");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("GetBookByIdControllerFactory", () => {
  it("should create an instance of GetBookByIdController", () => {
    const factory = new GetBookByIdControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetBookByIdUseCase).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetBookByIdUseCase).toHaveBeenCalledTimes(1);

    expect(GetBookByIdController).toHaveBeenCalledWith(
      expect.any(GetBookByIdUseCase)
    );

    expect(controller).toBeInstanceOf(GetBookByIdController);
  });
});
