"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const carouselSlides = [
	{
		image: "/globe.svg",
		title: "Global AI Community",
		description:
			"Connect, discuss, and grow with learners and experts from around the world.",
	},
	{
		image: "/file.svg",
		title: "Add & Share Content",
		description:
			"Contribute your own generative AI resources and help others learn.",
	},
];

export default function Home() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % carouselSlides.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const prevSlide = () => {
		setCurrent((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
	};
	const nextSlide = () => {
		setCurrent((prev) => (prev + 1) % carouselSlides.length);
	};

	return (
		<main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500 relative overflow-hidden">
			{/* Modern button group in top right */}
			<div className="fixed top-6 right-8 z-50 flex gap-3">
				<Link
					href="/auth#login"
					className="px-5 py-2 rounded-full font-semibold bg-white/80 dark:bg-gray-900/80 text-blue-600 dark:text-pink-300 border border-blue-300 dark:border-pink-400 shadow hover:bg-blue-600 hover:text-white dark:hover:bg-pink-400 dark:hover:text-gray-900 transition-all duration-200 backdrop-blur-md"
				>
					Login
				</Link>
				<Link
					href="/auth#signup"
					className="px-5 py-2 rounded-full font-semibold bg-blue-600 dark:bg-pink-400 text-white shadow hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:hover:text-pink-400 border border-blue-600 dark:border-pink-400 transition-all duration-200"
				>
					Sign Up
				</Link>
			</div>
			{/* Plain carousel text at the top, no images, with arrows */}
			<section className="w-full pt-16 pb-8 flex flex-row items-center justify-center gap-4 select-none">
				<button
					aria-label="Previous slide"
					onClick={prevSlide}
					className="rounded-full p-2 text-2xl font-bold text-blue-500 dark:text-pink-300 hover:bg-blue-100 dark:hover:bg-pink-900/30 transition disabled:opacity-50"
					disabled={carouselSlides.length <= 1}
				>
					&#8592;
				</button>
				<div className="flex flex-col items-center">
					<h1 className="text-3xl md:text-5xl font-extrabold text-pink-700 dark:text-pink-300 mb-2 text-center tracking-widest drop-shadow-lg">
						{carouselSlides[current].title}
					</h1>
					<p className="text-base md:text-xl text-gray-700 dark:text-gray-200 mb-4 text-center max-w-2xl">
						{carouselSlides[current].description}
					</p>
					<div className="flex justify-center items-center mt-2">
						{carouselSlides.map((_, idx) => (
							<span
								key={idx}
								className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
									idx === current
										? "bg-blue-500 dark:bg-pink-400 scale-125"
										: "bg-gray-300 dark:bg-gray-600"
								}`}
							/>
						))}
					</div>
				</div>
				<button
					aria-label="Next slide"
					onClick={nextSlide}
					className="rounded-full p-2 text-2xl font-bold text-blue-500 dark:text-pink-300 hover:bg-blue-100 dark:hover:bg-pink-900/30 transition disabled:opacity-50"
					disabled={carouselSlides.length <= 1}
				>
					&#8594;
				</button>
			</section>
			{/* Modern, full-width footer at the bottom */}
			<footer className="w-full fixed bottom-0 left-0 bg-white/90 dark:bg-gray-900/90 flex flex-col items-center justify-center px-8 py-4 border-t border-blue-200 dark:border-pink-400 z-40 backdrop-blur-md gap-2">
				<nav className="flex flex-wrap justify-center gap-6 mb-1">
					<Link
						href="/"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Home
					</Link>
					<Link
						href="/courses"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Courses
					</Link>
					<Link
						href="/forum"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Forum
					</Link>
					<Link
						href="/blog"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Blog
					</Link>
					<Link
						href="/add-content"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Add Content
					</Link>
					<Link
						href="/contact"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Contact Us
					</Link>
					<Link
						href="/privacy"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Privacy Policy
					</Link>
					<Link
						href="/terms"
						className="text-blue-600 dark:text-pink-300 font-semibold hover:underline hover:text-blue-800 dark:hover:text-pink-400 transition"
					>
						Terms of Service
					</Link>
				</nav>
				<span className="text-blue-500 dark:text-pink-300 text-xs tracking-widest mt-1">
					&copy; {new Date().getFullYear()} GenAI. All rights reserved.
				</span>
			</footer>
		</main>
	);
}
