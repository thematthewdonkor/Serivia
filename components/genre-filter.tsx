"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { getMoviesGenres } from "@/actions/getMoviesGenres";
import { useSearchParams, useRouter } from "next/navigation";

import qs from "query-string";

interface GenreFilterProps {
  handleClick: (id: number) => void;
}

interface Genres {
  id: number;
  name: string;
}

export const GenreFilter = ({ handleClick }: GenreFilterProps) => {
  const [activeGenre, setActiveGenre] = useState<string>("");
  const [genres, setGenres] = useState<Genres[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    try {
      setGenres([]);

      const fetchGenres = async () => {
        const data = await getMoviesGenres();

        setGenres(data);
      };

      fetchGenres();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, []);

  //HANDLE CLICK FUNCTION
  const handleGenreClick = useCallback(
    (id: number, name: string) => {
      let currentQuery = {};

      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }

      //Update the query param with only the genre id
      const updatedQuery: Record<string, string | undefined> = {
        ...currentQuery,
        genre: String(id),
      };

      delete updatedQuery.query;

      const url = qs.stringifyUrl({
        url: "/",
        query: updatedQuery,
      });

      router.push(url);
      handleClick(id);
      setActiveGenre(name);
    },
    [router, searchParams, handleClick]
  );

  return (
    <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8 overflow-x-auto scroll-smooth scrollbar-hidden">
      {genres.map(({ id, name }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            handleGenreClick(id, name);
          }}
          key={id}
          className={` 
            hover:bg-white
            text-gray-300 text-sm md:text-lg rounded-2xl font-normal
            ${
              activeGenre === name &&
              "bg-white hover:text-gray-900 text-gray-900"
            }`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
