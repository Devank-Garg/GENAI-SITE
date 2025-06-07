"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      setShowFooter(scrollY + windowHeight >= bodyHeight - 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Shared Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200 dark:border-pink-400 flex items-center px-8 py-4 shadow-sm gap-6">
        <Link href="/" className="text-2xl font-extrabold text-blue-700 dark:text-pink-300 tracking-widest hover:underline mr-6">
          AI Playground
        </Link>
        <span className="hidden md:inline text-base font-medium text-gray-700 dark:text-gray-200 opacity-80 flex-1">
          Democratizing AI for Everyone
        </span>
        <div className="flex gap-3 ml-auto">
          {!loading && !user && (
            <Link
              href="/login"
              className="px-5 py-2 rounded-full font-semibold bg-blue-600 dark:bg-pink-400 text-white shadow hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:hover:text-pink-400 border border-blue-600 dark:border-pink-400 transition-all duration-200"
            >
              Login
            </Link>
          )}
          {!loading && user && (
            <button
              onClick={signOut}
              className="px-5 py-2 rounded-full font-semibold bg-pink-500 dark:bg-blue-600 text-white shadow hover:bg-white hover:text-pink-500 dark:hover:bg-white dark:hover:text-blue-600 border border-pink-500 dark:border-blue-600 transition-all duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </header>
      <div className="pt-0 min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
        {children}
      </div>
      {/* Shared Footer, only visible at bottom */}
      {showFooter && (
        <footer className="w-full bg-white/90 dark:bg-gray-900/90 flex flex-col items-center justify-center px-8 py-4 border-t border-blue-200 dark:border-pink-400 z-40 backdrop-blur-md gap-2">
          <nav className="flex flex-wrap justify-center gap-6 mb-1">
            <Link href="/" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Home</Link>
            <Link href="/courses" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Courses</Link>
            <Link href="/forum" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Forum</Link>
            <Link href="/blog" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Blog</Link>
            <Link href="/add-content" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Add Content</Link>
            <Link href="/contact" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Contact Us</Link>
            <Link href="/privacy" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition">Terms of Service</Link>
          </nav>
          <span className="text-blue-500 dark:text-pink-300 text-xs tracking-widest mt-1">
            &copy; {new Date().getFullYear()} GenAI. All rights reserved.
          </span>
        </footer>
      )}
    </>
  );
}
