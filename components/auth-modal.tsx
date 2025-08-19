"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  return <Dialog>{children}</Dialog>;
};
