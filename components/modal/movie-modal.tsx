"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { getMovieDetails } from "@/actions/getMovieDetails";
import { useMovieModal } from "@/hooks/useMovieModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useUser } from "@/hooks/useUser";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
}

type VideoType = "Trailer" | "Teaser" | "Recap";
type VideoSite = "YouTube";

interface Video {
  key: string;
  official: boolean;
  site: VideoSite;
  type: VideoType;
}

export const MovieModal = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onOpenChange, isOpen, onClose, movieId } = useMovieModal();

  const loginModal = useLoginModal();
  const user = useUser();

  const handleClick = () => {
    // if user is not authenticated open the auth Modal and allow the user to login before watching trailer
    if (!user) {
      return loginModal.onOpen();
    }

    //Once the user login then the user can play the trailer
    setShowTrailer(true);
  };

  //This function is responsible for pass the movie id to the server func
  //2.Responsible for gettting the movie traveller and the trailer key
  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);

        if (data) {
          setMovie(data);

          const trailer =
            data.videos.results.find(
              (video: Video) =>
                video.type === "Trailer" && video.site === "YouTube"
            ) ||
            data.videos.results.find(
              (video: Video) =>
                video.type === "Teaser" && video.site === "YouTube"
            ) ||
            data.videos.results.find(
              (video: Video) =>
                video.type === "Recap" && video.site === "YouTube"
            );

          if (trailer) {
            setTrailerKey(trailer.key);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  //Go back and use the movie Modal zustand state
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpenChange() : onClose())}
    >
      <DialogContent className="max-w-md md:max-w-7xl bg-slate-900 text-white p-0 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 md:h-96">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : showTrailer && trailerKey ? (
          <div className="relative aspect-video">
            {/* I will look at how to use video properly in nextjs applications */}
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg p-0"
            />
            <Button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 bg-black/70 rounded-full p-2 hover:bg-black/90"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
        ) : (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                  : `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
              }
              alt={movie.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/40 to-transparent" />
            {trailerKey && (
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <Button
                  size="lg"
                  onClick={handleClick}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Play className="w-5 h-5 mr-2" /> Play Trailer
                </Button>
              </div>
            )}
          </div>
        )}

        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold flex flex-col">
            {!trailerKey && (
              <small className="text-xs bg-white text-black p-1 w-58 text-nowrap mb-4 rounded-md">
                Sorry, this movie doesn&apos;t have video😭
              </small>
            )}
            {movie.title}
          </DialogTitle>
          <p className="text-gray-400 text-sm">
            {movie.release_date} • {movie.runtime} min • ⭐
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="mt-3 text-gray-300 text-sm leading-relaxed">
            {movie.overview}
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
