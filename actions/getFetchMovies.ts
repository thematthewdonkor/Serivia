"use server";

import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const fetchMovies = async (query: string) => {
  "use cache";

  try {
    const endpoint = query
      ? `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}&language=en-US&page=1&include_adult=false`
      : `${TMDB_BASE_URL}/discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

    //Fetch data / make a call
    const response = await axios.get(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    throw error;
  }
};
