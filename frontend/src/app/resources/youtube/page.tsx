import Link from "next/link";

export default function YoutubeResources() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500 relative overflow-hidden">
      <section className="w-full pt-32 pb-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 dark:text-red-400 mb-8 text-center tracking-widest drop-shadow-lg">
          AI YouTube Channels
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-8">
          {/* Example Channel Card */}
          <a href="https://www.youtube.com/@sentdex" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              <span className="font-bold text-lg text-red-600 dark:text-red-400">Sentdex</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Machine Learning & AI Tutorials</p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 gap-2">
              <span>👥 1.2M+</span>
              <span>•</span>
              <span>Python</span>
            </div>
          </a>
          {/* Add more channel cards as needed */}
        </div>
        <Link href="/" className="mt-12 text-red-600 dark:text-red-400 font-semibold hover:underline">← Back to Home</Link>
      </section>
    </main>
  );
} 