import { Router } from "express";
import {
  getSimilarTvShows,
  getTrailerTv,
  getTvShowDetail,
  getTvShowsByCategory,
  trendingTvShows,
} from "../controllers/tvShowController.js";
const routes = Router();

// trending tv show
routes.get("/trending", trendingTvShows);

// movie trailer
routes.get("/:id/trailers", getTrailerTv);

// movie details
routes.get("/:id/detail", getTvShowDetail);

// similar movies
routes.get("/:id/similar", getSimilarTvShows);

// movies by category
routes.get("/:category", getTvShowsByCategory);

export default routes;
