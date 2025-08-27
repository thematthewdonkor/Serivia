import qs from "query-string";
import axios from "axios";

export const getFeaturedMovie = async (
  params: Record<string, string | number | undefined>
) => {
  const query = qs.stringify(params, {
    skipNull: true,
  });

  //Fetching recommended movies
  const response = await axios.get(
    `https://api.themoviedb.org/4/account/688ff953e85e91436ef3e4d5/movie/recommendations?${query}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTAxODk1MTVhY2QxYWRhNTlmYTFkZjAxM2E4ZmVhNCIsIm5iZiI6MTc1NDI2NTkzOS42NjYsInN1YiI6IjY4OGZmOTUzZTg1ZTkxNDM2ZWYzZTRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MAZnPMwBzP9qq3tPMzgrvaf6f7NowXXkNZ15kHlRqQo
`,
      },
    }
  );

  return response.data;
};
