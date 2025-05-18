import { GetBestSellersBooksController } from "@/application/controllers";
import { GetBestSellersBooksUseCase } from "@/domain/use-cases";
import { BookRepositoryMongo } from "@/infraestructure/database/mongodb";

class GetBestSellersBooksControllerFactory {
  create(): GetBestSellersBooksController {
    const repository = new BookRepositoryMongo();
    const useCase = new GetBestSellersBooksUseCase(repository);
    const controller = new GetBestSellersBooksController(useCase);

    return controller;
  }
}

export default GetBestSellersBooksControllerFactory;
