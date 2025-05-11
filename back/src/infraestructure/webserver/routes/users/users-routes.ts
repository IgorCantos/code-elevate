import {
  GetRecentlyViewedBooksControllerFactory,
  UpdateRecentlyViewedBooksControllerFactory,
} from "@/facotries";
import { FastifyInstance } from "fastify";

async function usersRoutes(fastify: FastifyInstance) {
  const updateRecentlyViewedBooksControllerFactory =
    new UpdateRecentlyViewedBooksControllerFactory().create();
  const getRecentlyViewedBooksControllerFactory =
    new GetRecentlyViewedBooksControllerFactory().create();

  /**
   * Users
   */
  fastify.post("/v1/users/:userId/recently-viewed", (req, res) =>
    updateRecentlyViewedBooksControllerFactory.execute(req, res)
  );

  fastify.get("/v1/users/:userId/recently-viewed", (req, res) =>
    getRecentlyViewedBooksControllerFactory.execute(req, res)
  );
}

export default usersRoutes;
