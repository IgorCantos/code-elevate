import { Book } from "@/domain/entities";
import { ICacheRepository } from "@/domain/repositories";

class UpdateRecentlyViewedBooksUseCase {
  cacheRepository: ICacheRepository;

  constructor(cacheRepository: ICacheRepository) {
    this.cacheRepository = cacheRepository;
  }

  async execute({
    userId,
    data,
  }: {
    userId: string;
    data: any;
  }): Promise<void> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!data) {
      throw new Error("Data is required");
    }

    const book = new Book(data);
    book.validate();

    const cacheKey = `recently_viewed_books_${userId}`;

    await this.cacheRepository.setCache(cacheKey, book);

    return;
  }
}

export default UpdateRecentlyViewedBooksUseCase;
