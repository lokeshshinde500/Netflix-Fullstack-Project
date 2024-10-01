import { fetchFromTmdb } from "../services/tmdbService.js";

// trending movies
export const trendingMovies = async (req, res) => {
  try {
    console.log(req.user);
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const trendingMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    return res.status(200).json({ content: trendingMovie, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! trending movies!",
      success: false,
    });
  }
};

// get trailer by id
export const getTrailer = async (req, res) => {
  try {
    const movie = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${req.params.id}/videos?language=en-US`
    );

    return res.status(200).json({ trailer: movie.results, success: true });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({
      message: "Internal server error! trailer by id!",
      success: false,
    });
  }
};

// movie details by id
export const getMovieDetail = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${req.params.id}?language=en-US`
    );
    console.log(data);
    return res.status(200).json({ content: data, success: true });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({
      message: "Internal server error! movie detail id!",
      success: false,
    });
  }
};

// get similar movies by id
export const getSimilarMovies = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${req.params.id}/similar?language=en-US&page=1`
    );
    console.log(data);
    return res.status(200).json({ similar: data.results, success: true });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({
      message: "Internal server error! movie detail id!",
      success: false,
    });
  }
};

// get movies by category
export const getMoviesByCategory = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${req.params.category}?language=en-US&page=1`
    );
    console.log(data);
    return res.status(200).json({ content: data.results, success: true });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({
      message: "Internal server error! movie detail id!",
      success: false,
    });
  }
};
