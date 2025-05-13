import { Book } from "@/domain/entities";

interface IGetBookByIdService {
  execute({ id }: { id: string }): Promise<Book | null>;
}

export default IGetBookByIdService;
