import axios from "axios";
import constant from "../config/constant.js";

export const fetchFromTmdb = async (url) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + constant.MOVIE_API_KEY,
      },
    };

    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error("Error fetching from TMDB:");
    throw error;
  }
};
