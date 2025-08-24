import { createClient } from "@/utils/supabase/client";

export const addFavorite = async (movieId: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("favorite")
    .insert([{ user_id: user.id, movie_id: movieId }]);

  if (error) throw error;
};
