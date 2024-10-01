import { fetchFromTmdb } from "../services/tmdbService.js";

// trending tv Shows
export const trendingTvShows = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const trendingShows =
      data.results[Math.floor(Math.random() * data.results.length)];

    return res.status(200).json({ content: trendingShows, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! trending tv Shows!",
      success: false,
    });
  }
};

// get trailer by id
export const getTrailerTv = async (req, res) => {
  try {
    const tv = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${req.params.id}/videos?language=en-US`
    );

    return res.status(200).json({ trailer: tv.results, success: true });
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

// tv show details by id
export const getTvShowDetail = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${req.params.id}?language=en-US`
    );
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

// get similar tv Shows by id
export const getSimilarTvShows = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${req.params.id}/similar?language=en-US&page=1`
    );
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

// get tv Shows by category
export const getTvShowsByCategory = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${req.params.category}?language=en-US&page=1`
    );
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
