import { UpdateRecentlyViewedBooksController } from "@/application/controllers";
import { UpdateRecentlyViewedBooksUseCase } from "@/application/use-cases";
import { RedisRepository } from "@/infraestructure/cache";

class UpdateRecentlyViewedBooksControllerFactory {
  create(): UpdateRecentlyViewedBooksController {
    const repository = new RedisRepository();
    const useCase = new UpdateRecentlyViewedBooksUseCase(repository);
    const controller = new UpdateRecentlyViewedBooksController(useCase);

    return controller;
  }
}

export default UpdateRecentlyViewedBooksControllerFactory;
