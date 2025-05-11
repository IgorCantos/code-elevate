import { GetBookByGenreController } from "@/application/controllers";
import { GetBookByPropertyService } from "@/application/services";
import GetBookByPropertyUseCase from "@/domain/use-cases/book/get-book-by-property-usecase";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBookByGenreControllerFactory {
  create(): GetBookByGenreController {
    const repository = new BookRepositoryMongo();
    const service = new GetBookByPropertyService(repository);
    const useCase = new GetBookByPropertyUseCase(service);
    const controller = new GetBookByGenreController(useCase);

    return controller;
  }
}

export default GetBookByGenreControllerFactory;
