import { GetBookByAuthorController } from "@/application/controllers";
import { GetBookByPropertyService } from "@/application/services";
import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";
import GetBookByAuthorControllerFactory from "./get-book-by-author-controller-factory";

jest.mock("@/application/controllers");
jest.mock("@/application/services");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe.only("GetBookByAuthorControllerFactory", () => {
  it("should create an instance of GetBookByAuthorControllerFactory", () => {
    const factory = new GetBookByAuthorControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetBookByPropertyService).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetBookByPropertyService).toHaveBeenCalledTimes(1);

    expect(GetBookByPropertyUseCase).toHaveBeenCalledWith(
      expect.any(GetBookByPropertyService)
    );
    expect(GetBookByPropertyUseCase).toHaveBeenCalledTimes(1);

    expect(GetBookByAuthorController).toHaveBeenCalledWith(
      expect.any(GetBookByPropertyUseCase)
    );

    expect(controller).toBeInstanceOf(GetBookByAuthorController);
  });
});
