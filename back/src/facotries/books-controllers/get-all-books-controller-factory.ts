import { GetAllBooksController } from "@/application/controllers";
import { GetAllBooksUseCase } from "@/application/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetAllBooksControllerFactory {
  create(): GetAllBooksController {
    const repository = new BookRepositoryMongo();
    const useCase = new GetAllBooksUseCase(repository);
    const controller = new GetAllBooksController(useCase);

    return controller;
  }
}

export default GetAllBooksControllerFactory;
