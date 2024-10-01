import { Router } from "express";
import {
  searchMovie,
  searchPerson,
  searchTvShow,
} from "../controllers/searchController.js";
const routes = Router();

// search person
routes.get("/person/:query", searchPerson);

// search movie
routes.get("/movie/:query", searchMovie);

// search tvShow
routes.get("/tv/:query", searchTvShow);
export default routes;
