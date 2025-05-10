import { GetAllBooksController } from "@/application/controllers";
import { GetAllBooksService } from "@/application/services";
import { GetAllBooksUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetAllBooksControllerFactory {
  create(): GetAllBooksController {
    const repository = new BookRepositoryMongo();
    const service = new GetAllBooksService(repository);
    const useCase = new GetAllBooksUseCase(service);
    const controller = new GetAllBooksController(useCase);

    return controller;
  }
}

export default GetAllBooksControllerFactory;
