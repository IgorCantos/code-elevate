import { GetBookByIdController } from "@/application/controllers";
import { GetBookByIdUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBookByIdControllerFactory {
  create(): GetBookByIdController {
    const repository = new BookRepositoryMongo();
    const useCase = new GetBookByIdUseCase(repository);
    const controller = new GetBookByIdController(useCase);

    return controller;
  }
}

export default GetBookByIdControllerFactory;
