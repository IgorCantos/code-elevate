import { GetBookByAuthorController } from "@/application/controllers";
import { GetBookByPropertyUseCase } from "@/application/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";
import GetBookByAuthorControllerFactory from "./get-book-by-author-controller-factory";

jest.mock("@/application/controllers");
jest.mock("@/domain/use-cases");
jest.mock("@/infraestructure/database/mongodb");

describe("GetBookByAuthorController", () => {
  it("should create an instance of GetBookByAuthorController", () => {
    const factory = new GetBookByAuthorControllerFactory();
    const controller = factory.create();

    expect(BookRepositoryMongo).toHaveBeenCalledTimes(1);

    expect(GetBookByPropertyUseCase).toHaveBeenCalledWith(
      expect.any(BookRepositoryMongo)
    );
    expect(GetBookByPropertyUseCase).toHaveBeenCalledTimes(1);

    expect(GetBookByAuthorController).toHaveBeenCalledWith(
      expect.any(GetBookByPropertyUseCase)
    );

    expect(controller).toBeInstanceOf(GetBookByAuthorController);
  });
});
