import express from "express";
import constant from "./config/constant.js";
import db from "./config/db.js";
import indexRoutes from "./routes/indexRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = constant.PORT;

// cors policy
app.use(cors());

// parse json data / urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for static files
app.use(express.static(path.resolve("public")));

// cookies
app.use(cookieParser());

// Create Server
app.listen(port, (error) => {
  if (error) {
    console.error("Server not started!");
  } else {
    console.log(`Server is running on port ${port}.`);
    db();
  }
});

// Routing
app.use("/api/v1", indexRoutes);
