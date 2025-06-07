"use client";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
      <div className="flex flex-1 w-full max-w-4xl mx-auto mt-12 mb-16 rounded-2xl shadow-lg overflow-hidden bg-white/90 dark:bg-gray-900/90 p-8">
        <section className="flex-1">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-pink-300 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
            We'd love to hear from you! Please fill out the form below or reach out to us directly at <a href="mailto:support@example.com" className="text-blue-600 dark:text-pink-400 underline">support@aiplayground.com</a>.
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-pink-400 dark:hover:bg-pink-500 dark:focus:ring-pink-300"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}