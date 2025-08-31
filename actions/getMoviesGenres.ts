"use server";

import axios from "axios";

export const getMoviesGenres = async () => {
  "use cache";
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTAxODk1MTVhY2QxYWRhNTlmYTFkZjAxM2E4ZmVhNCIsIm5iZiI6MTc1NDI2NTkzOS42NjYsInN1YiI6IjY4OGZmOTUzZTg1ZTkxNDM2ZWYzZTRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MAZnPMwBzP9qq3tPMzgrvaf6f7NowXXkNZ15kHlRqQo",
        },
      }
    );

    return response.data.genres;
  } catch (error) {
    console.log("Failed to get genres", error);
  }
};
