import { Book } from "@/domain/entities";
import {
  IBookRepository,
  IGetPaginatedBooksResponse,
} from "@/domain/repositories";
import MongoClientSingleton from "../connection/mongo-connection";
import { ObjectId, WithId } from "mongodb";

class BookRepositoryMongo implements IBookRepository {
  async getBooks({
    page,
    limit,
    title,
  }: {
    page: number;
    limit: number;
    title: string;
  }): Promise<IGetPaginatedBooksResponse> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    const skip = (page - 1) * limit;

    const filter = {
      ...(title && { title: { $regex: title, $options: "i" } }),
    };

    const [dbResponse, totalDocuments] = await Promise.all([
      db
        .collection<Book>("books")
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection<Book>("books").countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);
    const hasNextPage = page < totalPages;
    const booksList = dbResponse.map((book) => new Book(book));

    const response = {
      actualPage: page,
      limitePerPage: limit,
      totalDocuments,
      totalPages,
      hasNextPage,
      hasPreviousPage: page > 1,
      data: booksList,
    };

    return response;
  }

  async getBookById({ id }: { id: string }): Promise<Book | []> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    const book = await db
      .collection<WithId<Book>>("books")
      //@ts-ignore
      .findOne({ _id: new ObjectId(id) });

    if (!book) {
      return [];
    }

    return new Book(book);
  }

  async getBookByProperty({
    page,
    limit,
    author,
    genre,
  }: {
    page: number;
    limit: number;
    author?: string;
    genre?: string;
  }): Promise<IGetPaginatedBooksResponse> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    const skip = (page - 1) * limit;

    const filter = {
      ...(author && { author }),
      ...(genre && { genre }),
    };

    const [dbResponse, totalDocuments] = await Promise.all([
      db
        .collection<Book>("books")
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection<Book>("books").countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);
    const hasNextPage = page < totalPages;
    const booksList = dbResponse.map((book) => new Book(book));

    const response = {
      actualPage: page,
      limitePerPage: limit,
      totalDocuments,
      totalPages,
      hasNextPage,
      hasPreviousPage: page > 1,
      data: booksList,
    };

    return response;
  }

  async getBestSellersBooks({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    const skip = (page - 1) * limit;

    const [dbResponse, totalDocuments] = await Promise.all([
      db
        .collection<Book>("books")
        .find()
        .sort({ averageRating: -1, _id: 1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection<Book>("books").countDocuments(),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);
    const hasNextPage = page < totalPages;
    const booksList = dbResponse.map((book) => new Book(book));

    const response = {
      actualPage: page,
      limitePerPage: limit,
      totalDocuments,
      totalPages,
      hasNextPage,
      hasPreviousPage: page > 1,
      data: booksList,
    };

    return response;
  }
}

export default BookRepositoryMongo;
