import { Router } from "express";
import { MovieController } from "../controller/movies.js";
import { cacheMiddleware } from "../middleware/cache.js";

//import { cacheMiddleware } from '../middleware/cache.js'
// CAMBIOS
export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();
  const movieController = new MovieController({ movieModel });

  moviesRouter.get("/", cacheMiddleware(60), movieController.getAll);
  moviesRouter.get("/:id", cacheMiddleware(60), movieController.getById);
  moviesRouter.post("/", movieController.create);
  moviesRouter.delete("/:id", movieController.delete);
  moviesRouter.patch("/:id", movieController.update);

  return moviesRouter;
};
