import Link from "next/link";

export default function GithubResources() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500 relative overflow-hidden">
      <section className="w-full pt-32 pb-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-pink-300 mb-8 text-center tracking-widest drop-shadow-lg">
          Popular GitHub Repositories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-8">
          {/* Example Repo Card */}
          <a href="https://github.com/huggingface/transformers" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">Transformers</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">State-of-the-art NLP by Hugging Face</p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 gap-2">
              <span>⭐ 100k+</span>
              <span>•</span>
              <span>Python</span>
            </div>
          </a>
          {/* Add more repo cards as needed */}
        </div>
        <Link href="/" className="mt-12 text-blue-600 dark:text-pink-300 font-semibold hover:underline">← Back to Home</Link>
      </section>
    </main>
  );
} 