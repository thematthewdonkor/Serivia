"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchMovies } from "@/actions/getFetchMovies";
import { getMoviesByGenres } from "@/actions/getMoviesByGenres";
import { GenreFilter } from "./genre-filter";
import Image from "next/image";
import { Play } from "lucide-react";
import { useMovieModal } from "@/hooks/useMovieModal";
import { Suspense } from "react";

import { Loading } from "./loading";

//Movie details types properties
export type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

interface MovieCardProps {
  onGenreMovieLoad?: (movies: Movie[]) => void;
}

export const MovieCard = ({ onGenreMovieLoad }: MovieCardProps) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<string | null>(null);

  const { onOpen } = useMovieModal();

  // This function is going to fetch popular movies and search movies based on the url search params(query)
  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setMovies([]);

        const data = await fetchMovies(query);
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
        setMovies([]);
        setIsError("Failed to search movies, Please try again");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  //This function is going to fetch movies by genre id
  const handleClick = async (id: number) => {
    try {
      setIsLoading(true);
      setIsError(null);

      const data = await getMoviesByGenres(id);
      setMovies(data || []);

      /* The code snippet `if (onGenreMovieLoad) { onGenreMovieLoad(data || []); }` is checking if the
      `onGenreMovieLoad` function is provided as a prop to the `MovieCard` component. If the
      `onGenreMovieLoad` function is provided, it calls the function with the `data` received from
      fetching movies by genre ID or an empty array if `data` is null or undefined. */
      if (onGenreMovieLoad) {
        onGenreMovieLoad(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch movies by genre", error);
      setMovies([]);
      setIsError("Failed to load movies by genre");
    } finally {
      setIsLoading(false);
    }
  };

  if (!movies) return null;

  return (
    <div className="relative">
      {!isLoading ? (
        <div>
          <GenreFilter handleClick={handleClick} />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div
                  onClick={() => onOpen(movie.id)}
                  className="relative rounded-xl h-48 md:h-64 overflow-hidden mb-2"
                >
                  <Image
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    }
                    alt={movie.title}
                    fill
                    className="object-cover w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                    <Play className="w-10 h-10 text-white" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="w-full flex items-center justify-between gap-4 text-sm text-gray-300">
                    <span>{movie.release_date?.slice(0, 4)}</span>
                    <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
