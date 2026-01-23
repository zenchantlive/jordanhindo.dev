import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <Terminal className="w-16 h-16 text-terracotta-light mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-gray-200">
          404
        </h1>
        <p className="swiss-text-label text-gray-500 mb-6">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex px-4 py-2 rounded-lg bg-terracotta/10 border border-terracotta/30 text-terracotta-light hover:bg-terracotta/20 transition-colors text-sm font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
