"use client";

import { useCallback, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { Button } from "./ui/button";

const genres = [
  "Adventure",
  "Action",
  "Drama",
  "Fantasy",
  "Animation",
  "Documentary",
  "Horror",
  "History",
  "Music",
  "Romance",
  "Mystery",
  "Science Fiction",
  "Thriller",
  "Western",
  "Comedy",
  "Crime",
  "War",
];

export const GenreFilter = () => {
  const [activeGenre, setActiveGenre] = useState("");

  console.log(activeGenre);
  const params = useSearchParams();
  const router = useRouter();

  //Handle CLick Function
  const handleClick = (genre: string) => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      genres: genre,
    };

    if (params?.get("genres") === genre) {
      delete updatedQuery.genres;

      setActiveGenre("");
    } else {
      setActiveGenre(genre);
    }

    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8 overflow-x-auto scroll-smooth scrollbar-hidden">
      {genres.map((genre) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleClick(genre)}
          key={genre}
          className={` 
             hover:bg-white
               text-gray-300 text-sm md:text-lg rounded-2xl font-normal
              ${
                activeGenre === genre &&
                "bg-white hover:text-gray-900 text-gray-900"
              }`}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
};
