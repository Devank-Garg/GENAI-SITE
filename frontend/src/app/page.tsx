"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthProvider";

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
	{
		image: "/ai.jpeg",
		title: "Explore AI Technology",
		description:
			"Discover the latest advancements in artificial intelligence and machine learning.",
	},
];

export default function Home() {
	const [current, setCurrent] = useState(0);
	const { user, loading, signOut } = useAuth();

	// Maintain scroll position on navigation
	useEffect(() => {
		const savedScroll = sessionStorage.getItem("homeScroll");
		if (savedScroll) {
			window.scrollTo(0, parseInt(savedScroll, 10));
			sessionStorage.removeItem("homeScroll");
		}
		const handleBeforeUnload = () => {
			sessionStorage.setItem("homeScroll", window.scrollY.toString());
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			sessionStorage.setItem("homeScroll", window.scrollY.toString());
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

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
			{/* Sticky header with login/logout button */}
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
			{/* Plain carousel text at the top, no images, with arrows */}
			<section className="w-full pt-32 pb-8 flex flex-row items-center justify-center gap-4 select-none">
				<button
					aria-label="Previous slide"
					onClick={prevSlide}
					className="rounded-full p-2 text-2xl font-bold text-blue-500 dark:text-pink-300 hover:bg-blue-100 dark:hover:bg-pink-900/30 transition disabled:opacity-50 z-10"
					disabled={carouselSlides.length <= 1}
				>
					&#8592;
				</button>
				<div className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 p-8 rounded-2xl border-2 border-blue-200 dark:border-pink-400 shadow-xl backdrop-blur-sm w-full mx-4">
					<div className="w-full mb-6">
						<img
							src={carouselSlides[current].image}
							alt={carouselSlides[current].title}
							className="w-full h-[400px] object-contain rounded-lg shadow-lg"
						/>
					</div>
					<h1 className="text-3xl md:text-5xl font-extrabold text-pink-700 dark:text-pink-300 mb-2 text-center tracking-widest drop-shadow-lg">
						{carouselSlides[current].title}
					</h1>
					<p className="text-base md:text-xl text-gray-700 dark:text-gray-200 mb-4 text-center max-w-4xl">
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
					className="rounded-full p-2 text-2xl font-bold text-blue-500 dark:text-pink-300 hover:bg-blue-100 dark:hover:bg-pink-900/30 transition disabled:opacity-50 z-10"
					disabled={carouselSlides.length <= 1}
				>
					&#8594;
				</button>
			</section>

			{/* Course Cards Section */}
			<section className="w-full px-8 py-16">
				<h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
					Explore Our Courses
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{/* Beginner Course */}
					<Link href="/courses/beginner" className="group">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<div className="relative">
								<img
									src="/beginner.jpg"
									alt="Beginner AI Course"
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
									</svg>
									Beginner
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Introduction to AI
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									Start your AI journey with fundamental concepts and basic implementations.
								</p>
								<div className="flex items-center justify-between">
									<span className="text-blue-600 dark:text-blue-400 font-semibold">
										4.8 ★ (2.3k reviews)
									</span>
									<span className="text-gray-600 dark:text-gray-400">
										8 weeks
									</span>
								</div>
							</div>
						</div>
					</Link>

					{/* Intermediate Course */}
					<Link href="/courses/intermediate" className="group">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<div className="relative">
								<img
									src="/intermediate.jpg"
									alt="Intermediate AI Course"
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
									</svg>
									Intermediate
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Advanced AI Concepts
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									Deep dive into machine learning algorithms and neural networks.
								</p>
								<div className="flex items-center justify-between">
									<span className="text-blue-600 dark:text-blue-400 font-semibold">
										4.7 ★ (1.8k reviews)
									</span>
									<span className="text-gray-600 dark:text-gray-400">
										12 weeks
									</span>
								</div>
							</div>
						</div>
					</Link>

					{/* Advanced Course */}
					<Link href="/courses/advanced" className="group">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<div className="relative">
								<img
									src="/advanced.jpg"
									alt="Advanced AI Course"
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
									</svg>
									Advanced
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									AI Research & Development
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									Master cutting-edge AI techniques and research methodologies.
								</p>
								<div className="flex items-center justify-between">
									<span className="text-blue-600 dark:text-blue-400 font-semibold">
										4.9 ★ (950 reviews)
									</span>
									<span className="text-gray-600 dark:text-gray-400">
										16 weeks
									</span>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</section>

			{/* Online Resources Section */}
			<section className="w-full px-8 py-16 bg-gray-50 dark:bg-gray-900 mb-32">
				<h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
					Popular Online Resources
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{/* GitHub Repositories */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between">
						<div className="p-6">
							<div className="flex items-center mb-4">
								<svg className="w-8 h-8 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white ml-3">
									GitHub Repositories
								</h3>
							</div>
							<div className="space-y-4">
								<a href="https://github.com/huggingface/transformers" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
									<h4 className="font-semibold text-blue-600 dark:text-blue-400">Transformers</h4>
									<p className="text-sm text-gray-600 dark:text-gray-300">State-of-the-art NLP by Hugging Face</p>
									<div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
										<span>⭐ 100k+</span>
										<span className="mx-2">•</span>
										<span>Python</span>
									</div>
								</a>
								<a href="https://github.com/facebookresearch/llama" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
									<h4 className="font-semibold text-blue-600 dark:text-blue-400">LLaMA</h4>
									<p className="text-sm text-gray-600 dark:text-gray-300">Meta's Large Language Model</p>
									<div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
										<span>⭐ 50k+</span>
										<span className="mx-2">•</span>
										<span>Python</span>
									</div>
								</a>
							</div>
						</div>
						<div className="px-6 pb-6">
							<a href="/resources/github" className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition mt-4">View More</a>
						</div>
					</div>

					{/* Hugging Face Courses */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between">
						<div className="p-6">
							<div className="flex items-center mb-4">
								<img src="/huggingface.svg" alt="Hugging Face" className="w-8 h-8" />
								<h3 className="text-xl font-bold text-gray-800 dark:text-white ml-3">
									Hugging Face Courses
								</h3>
							</div>
							<div className="space-y-4">
								<a href="https://huggingface.co/course" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
									<h4 className="font-semibold text-blue-600 dark:text-blue-400">NLP Course</h4>
									<p className="text-sm text-gray-600 dark:text-gray-300">Learn Natural Language Processing</p>
									<div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
										<span>🕒 8 weeks</span>
										<span className="mx-2">•</span>
										<span>Free</span>
									</div>
								</a>
								<a href="https://huggingface.co/course/chapter1" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
									<h4 className="font-semibold text-blue-600 dark:text-blue-400">Transformers Course</h4>
									<p className="text-sm text-gray-600 dark:text-gray-300">Master Transformer Models</p>
									<div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
										<span>🕒 6 weeks</span>
										<span className="mx-2">•</span>
										<span>Free</span>
									</div>
								</a>
							</div>
						</div>
						<div className="px-6 pb-6">
							<a href="/resources/huggingface" className="inline-block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition mt-4">View More</a>
						</div>
					</div>

					{/* YouTube Channels */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between">
						<div className="p-6">
							<div className="flex items-center mb-4">
								<svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
									<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
								</svg>
								<h3 className="text-xl font-bold text-gray-800 dark:text-white ml-3">
									YouTube Channels
								</h3>
							</div>
							<div className="space-y-4">
								<a href="https://www.youtube.com/@sentdex" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
									<h4 className="font-semibold text-blue-600 dark:text-blue-400">Sentdex</h4>
									<p className="text-sm text-gray-600 dark:text-gray-300">Machine Learning & AI Tutorials</p>
									<div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
										<span>👥 1.2M+</span>
										<span className="mx-2">•</span>
										<span>Python</span>
									</div>
								</a>
								<a href="https://www.youtube.com/@3blue1brown" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
									<h4 className="font-semibold text-blue-600 dark:text-blue-400">3Blue1Brown</h4>
									<p className="text-sm text-gray-600 dark:text-gray-300">Visual Math & ML Explanations</p>
									<div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
										<span>👥 5M+</span>
										<span className="mx-2">•</span>
										<span>Math</span>
									</div>
								</a>
							</div>
						</div>
						<div className="px-6 pb-6">
							<a href="/resources/youtube" className="inline-block w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition mt-4">View More</a>
						</div>
					</div>
				</div>
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
