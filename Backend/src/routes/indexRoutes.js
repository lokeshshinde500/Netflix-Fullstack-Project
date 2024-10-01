import { Router } from "express";
import authRoutes from "./authRoutes.js";
import movieRoutes from "./movieRoutes.js";
import tvShowRoutes from "./tvShowRoutes.js";
import searchRoutes from "./searchRoutes.js";
import { authenticate } from "../middleware/authenticate.js";
import { getSearchHistory, removeItemFromSearchHistory } from "../controllers/searchController.js";
const routes = Router();

// auth routes
routes.use("/auth", authRoutes);

// movie routes
routes.use("/movie", authenticate, movieRoutes);

// tv show routes
routes.use("/tvShows", authenticate, tvShowRoutes);

// search routes
routes.use("/search", authenticate, searchRoutes);

// search history
routes.get("/history", authenticate, getSearchHistory);

// delete search history
routes.delete("/history/:id", authenticate, removeItemFromSearchHistory);
export default routes;
