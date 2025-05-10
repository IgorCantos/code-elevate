import { GetBookByIdController } from "@/application/controllers";
import { GetBookByPropertyService } from "@/application/services";
import { GetBookByIdUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBookByIdControllerFactory {
  create(): GetBookByIdController {
    const repository = new BookRepositoryMongo();
    const service = new GetBookByPropertyService(repository);
    const useCase = new GetBookByIdUseCase(service);
    const controller = new GetBookByIdController(useCase);

    return controller;
  }
}

export default GetBookByIdControllerFactory;
