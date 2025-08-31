import { create } from "zustand";

interface MovieModalStore {
  isOpen: boolean;
  movieId: number | null;
  onOpen: (movieId: number) => void;
  onClose: () => void;
  onOpenChange: () => void;
}

export const useMovieModal = create<MovieModalStore>((set) => ({
  isOpen: false,
  movieId: null,
  onOpenChange: () => set({ isOpen: true }),
  onOpen: (movieId: number) => set({ isOpen: true, movieId }),
  onClose: () => set({ isOpen: false, movieId: null }),
}));
