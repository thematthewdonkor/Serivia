"use client";

import { useEffect } from "react";
import { useLoginModal } from "@/hooks/useLoginModal";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useLoginModal();
  const supabase = createClient();
  const redirect = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        onClose();
      }
    });

    return () => subscription.unsubscribe();
  }, [onClose, supabase.auth]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <DialogContent className="sm:max-w-md bg-slate-800 backdrop-blur-sm border-slate-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome👋</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to get started.
          </DialogDescription>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#f1f5f9",
                  brandAccent: "#e2e8f0",
                  brandButtonText: "#1e293b",
                  defaultButtonBackground: "#334155",
                  defaultButtonBackgroundHover: "#475569",
                  defaultButtonBorder: "#475569",
                  defaultButtonText: "#f1f5f9",
                  dividerBackground: "#475569",
                  inputBackground: "#334155",
                  inputBorder: "#475569",
                  inputBorderFocus: "#64748b",
                  inputBorderHover: "#64748b",
                  inputText: "#ffff",
                  anchorTextColor: "#60a5fa",
                  anchorTextHoverColor: "#93c5fd",
                },
              },
            },
          }}
          providers={["google"]}
          queryParams={{
            access_type: "offline",
            prompt: "consent",
          }}
          redirectTo={redirect}
        />
      </DialogContent>
    </Dialog>
  );
};
