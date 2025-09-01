import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 space-y-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-gray-300">Loading...</span>
    </div>
  );
};
