import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="w-12 h-12 border-6 border-[var(--primary)] border-solid rounded-full animate-spin border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;
