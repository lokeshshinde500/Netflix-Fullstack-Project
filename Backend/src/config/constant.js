import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  // DB_URL: process.env.DB_LOCAL,
  DB_URL: process.env.DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  MOVIE_API_KEY: process.env.MOVIE_API_KEY,
};

