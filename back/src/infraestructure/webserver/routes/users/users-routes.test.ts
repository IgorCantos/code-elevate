import fastify, { FastifyInstance } from "fastify";
import usersRoutes from "./users-routes";
import HttpStatus from "@/infraestructure/utils/http-status";

jest.mock("@/facotries", () => ({
  GetRecentlyViewedBooksControllerFactory: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue({
      execute: jest.fn((req, res) =>
        res.status(HttpStatus.SUCCESS).send({ books: [] })
      ),
    }),
  })),
  UpdateRecentlyViewedBooksControllerFactory: jest
    .fn()
    .mockImplementation(() => ({
      create: jest.fn().mockReturnValue({
        execute: jest.fn((req, res) =>
          res.status(HttpStatus.SUCCESS).send({ books: [] })
        ),
      }),
    })),
}));

describe("usersRoutes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(usersRoutes);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return books by author", async () => {
    const userId = "123";
    const response = await app.inject({
      method: "GET",
      url: `/v1/users/:${userId}/recently-viewed`,
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
  });

  it("should return books by author", async () => {
    const userId = "123";
    const response = await app.inject({
      method: "POST",
      url: `/v1/users/:${userId}/recently-viewed`,
    });

    expect(response.statusCode).toBe(HttpStatus.SUCCESS);
  });
});
