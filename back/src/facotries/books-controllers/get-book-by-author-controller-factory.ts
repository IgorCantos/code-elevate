import { GetBookByAuthorController } from "@/application/controllers";
import { GetBookByPropertyService } from "@/application/services";
import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBookByAuthorControllerFactory {
  create(): GetBookByAuthorController {
    const repository = new BookRepositoryMongo();
    const service = new GetBookByPropertyService(repository);
    const useCase = new GetBookByPropertyUseCase(service);
    const controller = new GetBookByAuthorController(useCase);

    return controller;
  }
}

export default GetBookByAuthorControllerFactory;
