"use client";

export default function ThemeError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center flex flex-col gap-4 p-8">
        <h2 className="text-xl font-semibold text-text-primary">Something went wrong</h2>
        <p className="text-text-secondary">We couldn't load this page. Please try again.</p>
        <button onClick={reset} className="mx-auto px-5 py-3 bg-text-primary text-bg-secondary rounded-lg font-semibold text-sm cursor-pointer">
          Try again
        </button>
      </div>
    </div>
  );
}
