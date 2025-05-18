import { GetBookByGenreController } from "@/application/controllers";
import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBookByGenreControllerFactory {
  create(): GetBookByGenreController {
    const repository = new BookRepositoryMongo();
    const useCase = new GetBookByPropertyUseCase(repository);
    const controller = new GetBookByGenreController(useCase);

    return controller;
  }
}

export default GetBookByGenreControllerFactory;
