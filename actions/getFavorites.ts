import { createClient } from "@/utils/supabase/client";

export const getFavorite = async (movieId: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("favorite")
    .delete()
    .eq("user_id", user.id)
    .eq("movie_id", movieId);

  if (error) throw error;
};
