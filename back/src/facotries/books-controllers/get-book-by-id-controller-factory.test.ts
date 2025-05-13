import GetBookByIdControllerFactory from "./get-book-by-id-controller-factory";
import { GetBookByIdController } from "@/application/controllers";
import { GetBookByIdService } from "@/application/services";
import { GetBookByIdUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

jest.mock("@/application/controllers");
jest.mock("@/application/services");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("GetBookByIdControllerFactory", () => {
  it("should create an instance of GetBookByIdController", () => {
    const factory = new GetBookByIdControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetBookByIdService).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetBookByIdService).toHaveBeenCalledTimes(1);

    expect(GetBookByIdUseCase).toHaveBeenCalledWith(
      expect.any(GetBookByIdService)
    );
    expect(GetBookByIdUseCase).toHaveBeenCalledTimes(1);

    expect(GetBookByIdController).toHaveBeenCalledWith(
      expect.any(GetBookByIdUseCase)
    );

    expect(controller).toBeInstanceOf(GetBookByIdController);
  });
});
