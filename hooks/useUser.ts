import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

export const useUser = () => {
  const [user, setUser] = useState<null | User>(null);
  const supabase = createClient();

  useEffect(() => {
    /* The line `supabase.auth.getUser().then(({ data }) => setUser(data.user));` is making an
   asynchronous call to the Supabase client's `getUser()` method to retrieve information about the
   currently authenticated user. */
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    // console.log(user);
    /* The code snippet you provided is setting up a subscription to listen for changes in the
authentication state using Supabase's `onAuthStateChange` method. */

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  return user;
};
