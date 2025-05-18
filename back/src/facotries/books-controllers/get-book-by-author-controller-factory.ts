import { GetBookByAuthorController } from "@/application/controllers";
import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBookByAuthorControllerFactory {
  create(): GetBookByAuthorController {
    const repository = new BookRepositoryMongo();
    const useCase = new GetBookByPropertyUseCase(repository);
    const controller = new GetBookByAuthorController(useCase);

    return controller;
  }
}

export default GetBookByAuthorControllerFactory;
