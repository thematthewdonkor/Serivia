"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getFeaturedMovie } from "@/actions/getFeaturedMovie";
import { Badge } from "./ui/badge";

import axios from "axios";

interface Movie {
  id: number;
  title: string;
  backdrop_path?: string;
}

// interface GenresDetails {
//   id: number;
//   name?: string;
// }

interface MovieDetails extends Movie {
  runtime?: number | null;
  genres?: {
    name: string;
  }[];
}

export const HeroSection = () => {
  const [movie, setMovie] = useState<MovieDetails | null>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getFeaturedMovie({ page: 1 });

        if (!data.results?.[0]) return;

        const movie = data.results[0];

        const details = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTAxODk1MTVhY2QxYWRhNTlmYTFkZjAxM2E4ZmVhNCIsIm5iZiI6MTc1NDI2NTkzOS42NjYsInN1YiI6IjY4OGZmOTUzZTg1ZTkxNDM2ZWYzZTRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MAZnPMwBzP9qq3tPMzgrvaf6f7NowXXkNZ15kHlRqQo",
            },
          }
        );
        console.log(details);
        setMovie({
          ...movie,
          runtime: details.data.runtime,
          genres: details.data.genres,
        });
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    fetchMovie();
  }, []);

  const image = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "/placeholder.jpg";

  const title = movie?.title || "Hero image";
  const runtime = movie?.runtime;
  const genres = movie?.genres;
  console.log(genres);

  console.log(genres);
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return hours > 0 ? `${hours}h ${mins}m` : `${minutes}`;
  };

  return (
    <section className="relative rounded-2xl h-64 md:h-96 overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" />
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
            Action
          </Badge>
        )}
      </div>
    </section>
  );
};
