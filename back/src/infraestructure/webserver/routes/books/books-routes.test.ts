import fastify, { FastifyInstance } from "fastify";
import booksRoutes from "./books-routes";
import HttpStatus from "@/infraestructure/utils/http-status";

jest.mock("@/facotries", () => ({
  GetAllBooksControllerFactory: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue({
      execute: jest.fn((req, res) =>
        res.status(HttpStatus.SUCCESS).send({ books: [] })
      ),
    }),
  })),
  GetBookByIdControllerFactory: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue({
      execute: jest.fn((req, res) =>
        res.status(HttpStatus.SUCCESS).send({ book: { id: req.params.bookId } })
      ),
    }),
  })),
  GetBookByGenreControllerFactory: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue({
      execute: jest.fn((req, res) =>
        res
          .status(HttpStatus.SUCCESS)
          .send({ books: [{ genre: req.params.genre }] })
      ),
    }),
  })),
  GetBookByAuthorControllerFactory: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue({
      execute: jest.fn((req, res) =>
        res
          .status(HttpStatus.SUCCESS)
          .send({ books: [{ author: req.params.author }] })
      ),
    }),
  })),
}));

describe("booksRoutes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(booksRoutes);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return health status", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
    expect(response.json()).toEqual({ hello: "Ok." });
  });

  it("should return all books", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/v1/books",
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
    expect(response.json()).toEqual({ books: [] });
  });

  it("should return a book by ID", async () => {
    const bookId = "123";
    const response = await app.inject({
      method: "GET",
      url: `/v1/books/${bookId}`,
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
    expect(response.json()).toEqual({ book: { id: bookId } });
  });

  it("should return books by genre", async () => {
    const genre = "fiction";
    const response = await app.inject({
      method: "GET",
      url: `/v1/books/genre/${genre}`,
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
    expect(response.json()).toEqual({ books: [{ genre }] });
  });

  it("should return books by author", async () => {
    const author = "John Doe";
    const response = await app.inject({
      method: "GET",
      url: `/v1/books/author/${author}`,
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
    expect(response.json()).toEqual({ books: [{ author }] });
  });
});
