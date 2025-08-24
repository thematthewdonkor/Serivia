"use client";

import { useState } from "react";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const schema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useLoginModal();
  const router = useRouter();
  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const supabase = createClient();

  const handleChange = (value: string) => {
    setMode(value as "signin" | "signup");
    reset(); // Clear form when switching tabs
  };

  const getRedirectUrl = () => {
    return (
      process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
      `${window.location.origin}/auth/callback`
    );
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getRedirectUrl(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google sign-in error:", error.message);
        toast.error("Failed to sign in with Google. Please try again.");
        return;
      }

      // Close modal on successful OAuth initiation
      onClose();
    } catch (error) {
      console.error("Unexpected error during Google sign-in:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (values: FormData) => {
    setSubmitting(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: getRedirectUrl(),
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast.error(
              "An account with this email already exists. Please sign in instead."
            );
            setMode("signin");
          } else {
            toast.error(error.message || "Failed to create account");
          }
          return;
        }

        if (!data.session) {
          toast.success("Check your email to confirm your account.", {
            duration: 6000,
          });
          onClose();
        } else {
          toast.success("Account created successfully! You are now signed in.");
          router.refresh();
          onClose();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error(
              "Invalid email or password. Please check your credentials."
            );
          } else if (error.message.includes("Email not confirmed")) {
            toast.error(
              "Please check your email and confirm your account before signing in."
            );
          } else {
            toast.error(error.message || "Failed to sign in");
          }
          return;
        }

        toast.success("Successfully signed in!");
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const GoogleIcon = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <DialogTrigger asChild onClick={onOpen}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-sm border-slate-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Welcome to Serivia
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {mode === "signin"
              ? "Sign in to your account to continue"
              : "Create a new account to get started"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={handleChange} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-slate-700/50">
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-slate-300"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-slate-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-6">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              disabled={submitting}
              className="w-full bg-transparent text-white border-slate-600 hover:bg-slate-700/50 hover:text-white hover:border-slate-500 disabled:opacity-50"
            >
              <GoogleIcon />
              {submitting ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="text-white border-slate-600 bg-slate-700/50 placeholder:text-slate-400 focus:border-slate-500"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="text-white border-slate-600 bg-slate-700/50 placeholder:text-slate-400 focus:border-slate-500"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white disabled:opacity-50"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              disabled={submitting}
              className="w-full bg-transparent text-white border-slate-600 hover:bg-slate-700/50 hover:text-white hover:border-slate-500 disabled:opacity-50"
            >
              <GoogleIcon />
              {submitting ? "Creating account..." : "Sign up with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">
                  Or create account with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="text-white border-slate-600 bg-slate-700/50 placeholder:text-slate-400 focus:border-slate-500"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Password</Label>
                <Input
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  className="text-white border-slate-600 bg-slate-700/50 placeholder:text-slate-400 focus:border-slate-500"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white disabled:opacity-50"
              >
                {submitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
