"use server";

import axios from "axios";

export const getSearchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTAxODk1MTVhY2QxYWRhNTlmYTFkZjAxM2E4ZmVhNCIsIm5iZiI6MTc1NDI2NTkzOS42NjYsInN1YiI6IjY4OGZmOTUzZTg1ZTkxNDM2ZWYzZTRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MAZnPMwBzP9qq3tPMzgrvaf6f7NowXXkNZ15kHlRqQo",
          /* The `cache: "no store"` option in the axios request header is used to indicate that the
        response should not be stored in any cache. This means that the response should not be saved
        in the browser cache or any intermediary caches along the network path. */
          cache: "no store", //always we serve fresh movies to the user not outdated movies
        },
      }
    );

    if (!response.data) throw new Error("Failed to fetch data!");

    return response.data.results;
  } catch (error) {
    throw error;
  }
};
