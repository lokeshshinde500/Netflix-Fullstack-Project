import userModel from "../models/userModel.js";
import { fetchFromTmdb } from "../services/tmdbService.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results, success: true });
  } catch (error) {
    console.log("Error in searchPerson controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;

  try {
    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ content: response.results, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

export async function searchTvShow(req, res) {
  const { query } = req.params;

  try {
    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.json({ success: true, content: response.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;

  id = parseInt(id);

  try {
    await userModel.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Item deleted from search history" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
