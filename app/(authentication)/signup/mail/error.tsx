"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <main className="flex py-4 px-6 flex-col items-center justify-center bg-background-500 rounded-md">
      <h2 className="text-center font-bold">Something went wrong!</h2>
      <p className="text-center text-sm text-red-700 mb-3">{error.message}</p>
      <button
        className="mt-4 rounded-md bg-logo-500 px-4 py-2 text-sm transition-colors hover:brightness-75"
        onClick={
          // Attempt to recover by trying to re-render the posts route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
