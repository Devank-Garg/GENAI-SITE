"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateForm = () => {
      if (window.location.hash === '#signup') setActiveForm('signup');
      else setActiveForm('login');
    };
    updateForm();
    window.addEventListener('hashchange', updateForm);
    return () => window.removeEventListener('hashchange', updateForm);
  }, []);

  const validatePassword = (password: string) => {
    // At least 8 chars, one letter, one number
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!validatePassword(signupPassword)) {
      setError("Password must be at least 8 characters, include at least one letter and one number.");
      setLoading(false);
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({ email: signupEmail, password: signupPassword });
    if (error) setError(error.message);
    else setSuccess("Check your email for a confirmation link.");
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    if (error) setError(error.message);
    else {
      setSuccess("Logged in successfully!");
      setTimeout(() => router.push("/"), 1000);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <div className="max-w-md w-full bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg p-8 flex flex-col items-center border-4 border-dashed border-pink-300 dark:border-pink-700">
        {activeForm === 'login' && (
          <>
            <h2 id="login" className="text-2xl font-bold mb-6 text-pink-700 dark:text-pink-300">Login</h2>
            <form className="w-full flex flex-col gap-4 mb-8" onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowLoginPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  tabIndex={-1}
                >
                  {showLoginPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.772 6.066 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.02M21.75 12c-.512-.948-1.22-1.977-2.102-2.977M15.75 9.75a3.75 3.75 0 1 0-5.5 5.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S6.25 5.25 12 5.25 21.75 12 21.75 12 17.75 18.75 12 18.75 2.25 12 2.25 12z" />
                      <circle cx="12" cy="12" r="3.75" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition"
                disabled={loading}
              >
                Login
              </button>
            </form>
            <Link href="/" className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              ← Back to Home
            </Link>
          </>
        )}
        {activeForm === 'signup' && (
          <>
            <h2 id="signup" className="text-2xl font-bold mb-6 text-pink-700 dark:text-pink-300">Sign Up</h2>
            <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}>
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <div className="relative">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label={showSignupPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowSignupPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  tabIndex={-1}
                >
                  {showSignupPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.772 6.066 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.02M21.75 12c-.512-.948-1.22-1.977-2.102-2.977M15.75 9.75a3.75 3.75 0 1 0-5.5 5.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S6.25 5.25 12 5.25 21.75 12 21.75 12 17.75 18.75 12 18.75 2.25 12 2.25 12z" />
                      <circle cx="12" cy="12" r="3.75" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showSignupConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={signupConfirmPassword}
                  onChange={e => setSignupConfirmPassword(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label={showSignupConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowSignupConfirmPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  tabIndex={-1}
                >
                  {showSignupConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.772 6.066 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.02M21.75 12c-.512-.948-1.22-1.977-2.102-2.977M15.75 9.75a3.75 3.75 0 1 0-5.5 5.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S6.25 5.25 12 5.25 21.75 12 21.75 12 17.75 18.75 12 18.75 2.25 12 2.25 12z" />
                      <circle cx="12" cy="12" r="3.75" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded font-semibold hover:bg-pink-600 transition"
                disabled={loading}
              >
                Sign Up
              </button>
            </form>
            <Link href="/" className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              ← Back to Home
            </Link>
          </>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </div>
    </main>
  );
}
