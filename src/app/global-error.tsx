"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#fcfbf8]">
        <div className="text-center flex flex-col gap-4 p-8">
          <h1 className="text-2xl font-semibold text-[#0b3c61]">Something went wrong</h1>
          <p className="text-[#0b3c61]/70">An unexpected error occurred. Please try again.</p>
          <button onClick={reset} className="mx-auto px-5 py-3 bg-[#0b3c61] text-[#ecf7ff] rounded-lg font-semibold text-sm cursor-pointer">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
