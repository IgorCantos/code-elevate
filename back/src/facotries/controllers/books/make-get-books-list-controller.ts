import { BooksListController } from "@/application/controllers";
import { BooksListService } from "@/application/services";
import { BooksListUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class BooksControllerFactory {
  create(): BooksListController {
    const repository = new BookRepositoryMongo();
    const service = new BooksListService(repository);
    const useCase = new BooksListUseCase(service);
    const controller = new BooksListController(useCase);

    return controller;
  }
}

export default BooksControllerFactory;
