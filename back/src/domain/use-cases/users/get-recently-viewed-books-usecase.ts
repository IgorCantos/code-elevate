import { Book } from "@/domain/entities";
import { ICacheRepository } from "@/domain/repositories";

class GetRecentlyViewedBooksUseCase {
  cacheRepository: ICacheRepository;

  constructor(cacheRepository: ICacheRepository) {
    this.cacheRepository = cacheRepository;
  }

  async execute({ userId }: { userId: string }): Promise<Book[]> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const cacheKey = `recently_viewed_books_${userId}`;
    const cachedValue = await this.cacheRepository.getCache(cacheKey);

    const response = cachedValue.map((item: any) => new Book(JSON.parse(item)));

    return response;
  }
}

export default GetRecentlyViewedBooksUseCase;
