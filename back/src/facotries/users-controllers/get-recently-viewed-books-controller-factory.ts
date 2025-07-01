import { GetRecentlyViewedBooksController } from "@/application/controllers";
import { GetRecentlyViewedBooksUseCase } from "@/application/use-cases";
import { RedisRepository } from "@/infraestructure/cache";

class GetRecentlyViewedBooksControllerFactory {
  create(): GetRecentlyViewedBooksController {
    const repository = new RedisRepository();
    const useCase = new GetRecentlyViewedBooksUseCase(repository);
    const controller = new GetRecentlyViewedBooksController(useCase);

    return controller;
  }
}

export default GetRecentlyViewedBooksControllerFactory;
