import { IBooksListResponse } from "@/domain/repositories/book/book-repository";

interface IBooksListService {
  getBooksList(): Promise<IBooksListResponse>;
}

export default IBooksListService;
