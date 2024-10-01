import { Router } from "express";
import {
  getMovieDetail,
  getMoviesByCategory,
  getSimilarMovies,
  getTrailer,
  trendingMovies,
} from "../controllers/movieController.js";
const routes = Router();

// trending movies
routes.get("/trending", trendingMovies);

// movie trailer
routes.get("/:id/trailers", getTrailer);

// movie details
routes.get("/:id/detail", getMovieDetail);

// similar movies
routes.get("/:id/similar", getSimilarMovies);

// movies by category
routes.get("/:category",getMoviesByCategory);

export default routes;
