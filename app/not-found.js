import BackButton from "@/app/_components/BackButton"; // Adjust path accordingly
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="font-extrabold text-gray-800 text-7xl">404</h1>
      <p className="max-w-md mt-4 text-xl text-center text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row sm:gap-6">
        <Link
          href="/"
          className="text-lg font-medium text-indigo-600 hover:underline"
          aria-label="Go back home"
        >
          Go back home
        </Link>
      </div>
      <BackButton />
    </main>
  );
}
