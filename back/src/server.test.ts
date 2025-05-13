import Fastify from "fastify";
import { startServer } from "./server";

jest.mock("fastify", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      register: jest.fn(),
      listen: jest.fn(),
      log: { error: jest.fn() },
    })),
  };
});
jest.mock("@fastify/cors");
jest.mock("./infraestructure/webserver/routes", () => ({
  booksRoutes: jest.fn(),
  usersRoutes: jest.fn(),
}));

describe("Server", () => {
  let fastifyMock: any;

  beforeEach(() => {
    fastifyMock = {
      register: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
      log: { error: jest.fn() },
    };
    (Fastify as unknown as jest.Mock).mockReturnValue(fastifyMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log an error and exit the process if an error occurs", async () => {
    await startServer();
  });
});
