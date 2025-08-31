"use server";

import axios from "axios";

export const getMovieDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
