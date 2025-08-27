"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Play } from "lucide-react";

import Image from "next/image";
import { Badge } from "./ui/badge";
import { getFeaturedMovie } from "@/actions/getFeaturedMovie";

//Movie response body types
interface Movie {
  id: number;
  title?: string;
  backdrop_path?: string;
  media_type?: string;
  release_date?: string;
  vote_average: number;
}

//Extend the movieDetails types
interface MovieDetails extends Movie {
  runtime?: number | null;
  genres: {
    name: string;
  }[];
}

//Infer the genres properties
type InferedMovieDetails = MovieDetails["genres"][0];

export const HeroSection = () => {
  const [movie, setMovie] = useState<MovieDetails | null>();
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTION
  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      setIsLoading(false);

      try {
        const data = await getFeaturedMovie({ page: 1 });

        if (!data.results?.[0]) return;

        const movie = data.results[0];

        // Fetech movie details
        const details = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTAxODk1MTVhY2QxYWRhNTlmYTFkZjAxM2E4ZmVhNCIsIm5iZiI6MTc1NDI2NTkzOS42NjYsInN1YiI6IjY4OGZmOTUzZTg1ZTkxNDM2ZWYzZTRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MAZnPMwBzP9qq3tPMzgrvaf6f7NowXXkNZ15kHlRqQo
`,
            },
          }
        );

        //Update the state variable
        setMovie({
          ...movie,
          runtime: details.data.runtime,
          genres: details.data.genres,
        });
        setIsLoading(true);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    fetchFeaturedMovie();
  }, []);

  // VARIABLES
  const image = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "/placeholder.jpg";

  const title = movie?.title || "Hero image";
  const runtime = movie?.runtime;
  const genres: InferedMovieDetails | undefined = movie?.genres[0];
  const name = genres?.name;
  const mediaType = movie?.media_type;
  const date = movie?.release_date;
  const year = date?.slice(0, 4);
  const ratingDecimal = movie?.vote_average;
  const rating = ratingDecimal?.toFixed();

  // UTILITIES
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return hours > 0 ? `${hours}h ${mins}min` : `${minutes}`;
  };

  return (
    <section className="relative rounded-2xl h-64 md:h-96 overflow-hidden">
      {isLoading && (
        <div className="group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-wrap gap-1 md:gap-4">
            {runtime && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs md:text-sm"
              >
                {formatRuntime(runtime)}
              </Badge>
            )}

            {genres && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs md:text-sm"
              >
                {name}
              </Badge>
            )}

            {mediaType && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs md:text-sm"
              >
                {mediaType}
              </Badge>
            )}

            {year && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs md:text-sm"
              >
                {year}
              </Badge>
            )}

            {rating && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs md:text-sm"
              >
                {rating}+
              </Badge>
            )}
          </div>

          <div className="absolute w-full bottom-3 px-4 md:px-6 flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Play className="w-4 h-4 text-gray-100" />
              </div>
              {title && <p className="text-gray-300">{title}</p>}
            </div>

            <div className="bg-transparent border-1 rounded-full p-2">
              <Heart className="h-4 w-4 text-gray-100" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
