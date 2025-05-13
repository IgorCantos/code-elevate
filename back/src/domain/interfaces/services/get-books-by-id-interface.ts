import { Book } from "@/domain/entities";

interface IGetBookByIdService {
  execute({ id }: { id: string }): Promise<Book | []>;
}

export default IGetBookByIdService;
