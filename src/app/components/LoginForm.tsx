'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserIcon = () => (
  <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="16" height="10" x="4" y="11" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
  </svg>
);



const validateUsername = (value: string) => {
  // Username: 3-20 chars, letters, numbers, underscores
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(value);
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const newErrors: { username?: string; password?: string } = {};
    if (!validateUsername(username)) {
      newErrors.username = 'Enter a valid username (3-20 letters, numbers, or _).';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 10 characters, include a capital letter, a number, and a special character.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Call backend API
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else {
          setServerError(data.message || 'Login failed.');
          setSubmitted(false);
        }
      } catch {
        setServerError('Server error. Please try again.');
        setSubmitted(false);
      }
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-400 px-2 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-teal-600 py-6 px-4 sm:py-7 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Login Form</h2>
        </div>
        <div className="px-4 py-6 sm:px-8 sm:py-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-2 py-2 sm:px-3 focus-within:border-teal-600">
              <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
                <UserIcon />
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                placeholder="Username"
                required
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-xs sm:text-sm ml-2">{errors.username}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-2 py-2 sm:px-3 focus-within:border-teal-600">
              <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
                <LockIcon />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs sm:text-sm ml-2">{errors.password}</span>
            )}
          </div>
          <div className="text-left mt-1">
            <a href="#" className="text-gray-500 text-sm sm:text-base hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 mt-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg sm:text-xl transition"
          >
            Login
          </button>
          {serverError && (
            <div className="mt-2 text-red-600 text-center font-medium animate-fade-in text-sm sm:text-base">
              {serverError}
            </div>
          )}
          {submitted && !serverError && (
            <div className="mt-2 text-green-600 text-center font-medium animate-fade-in text-sm sm:text-base">
              Login successful!
            </div>
          )}
          <div className="py-3 sm:py-4 text-center text-gray-700 text-base sm:text-lg">
            Not a member?{' '}
            <a href="#" className="text-teal-600 font-semibold hover:underline">Signup now</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
