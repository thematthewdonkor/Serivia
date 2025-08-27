"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/actions/getPopularMovies";
import Image from "next/image";
import { Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export const MovieCard = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      if (!data) return;

      const movies = data?.results;

      setMovies(movies);
      console.log(movies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie) => {
        const image = movie?.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
          : "/placeholder.jpg";
        const year = movie?.release_date.slice(0, 4);
        const rating = movie?.vote_average.toFixed(2);
        return (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative rounded-xl h-48 md:h-64 overflow-hidden mb-2">
              <Image
                src={image}
                alt={movie.title}
                fill
                className="object-cover  group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="space-y-1">
              <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300 transition-colors">
                {movie.title}
              </h3>
              <div className="w-full flex items-center justify-between gap-4 text-xs text-gray-300">
                <span>{year}</span>

                <div className="flex items-center justify-between gap-1">
                  <Star className="w-3 h-3 text-yellow-600" fill="orange" />
                  <span>{rating}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
