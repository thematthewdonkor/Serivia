import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1f2937",
          color: "#f9fafb",
          borderRadius: "8px",
          fontSize: "14px",
          fontFamily: "var(--font-poppins)",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};
