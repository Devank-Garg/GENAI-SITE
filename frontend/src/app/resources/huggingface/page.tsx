import Link from "next/link";

export default function HuggingFaceResources() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500 relative overflow-hidden">
      <section className="w-full pt-32 pb-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-600 dark:text-yellow-400 mb-8 text-center tracking-widest drop-shadow-lg">
          Hugging Face Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-8">
          {/* Example Course Card */}
          <a href="https://huggingface.co/course" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <img src="/huggingface.svg" alt="Hugging Face" className="w-6 h-6" />
              <span className="font-bold text-lg text-yellow-600 dark:text-yellow-400">NLP Course</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Learn Natural Language Processing with hands-on tutorials.</p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 gap-2">
              <span>🕒 8 weeks</span>
              <span>•</span>
              <span>Free</span>
            </div>
          </a>
          {/* Add more course cards as needed */}
        </div>
        <Link href="/" className="mt-12 text-yellow-600 dark:text-yellow-400 font-semibold hover:underline">← Back to Home</Link>
      </section>
    </main>
  );
} 