"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function DashboardPage() {
  const [authActive, setAuthActive] = useState(true);
  const [apiActive, setApiActive] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);
  const [internetConnected, setInternetConnected] = useState(true);
  const [serverOnline, setServerOnline] = useState(true);
  const [restarting, setRestarting] = useState(false);
  const [restartCountdown, setRestartCountdown] = useState(20);
  const restartIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [rebooting, setRebooting] = useState(false);
  const [rebootCountdown, setRebootCountdown] = useState(10);
  const rebootIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Handle reboot logic
  const handleReboot = () => {
    setRebooting(true);
    setRebootCountdown(60);
  };

  // Emergency shutdown: set all true values to false (do not trigger reboot overlay)
  const handleEmergencyShutdown = () => {
    setAuthActive(false);
    setApiActive(false);
    setDbConnected(false);
    setInternetConnected(false);
    setServerOnline(false);
  };

  // Start system: set all values to true
  const handleStartSystem = () => {
    setAuthActive(true);
    setApiActive(true);
    setDbConnected(true);
    setInternetConnected(true);
    setServerOnline(true);
  };

  useEffect(() => {
    if (rebooting) {
      rebootIntervalRef.current = setInterval(() => {
        setRebootCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(rebootIntervalRef.current!);
            setTimeout(() => setRebooting(false), 500); // Hide overlay after countdown
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (rebootIntervalRef.current) clearInterval(rebootIntervalRef.current);
    };
  }, [rebooting]);

  const handleRestart = () => {
    setRestarting(true);
    setRestartCountdown(20);
  };

  useEffect(() => {
    if (restarting) {
      restartIntervalRef.current = setInterval(() => {
        setRestartCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(restartIntervalRef.current!);
            setTimeout(() => setRestarting(false), 500); // Hide overlay after countdown
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (restartIntervalRef.current) clearInterval(restartIntervalRef.current);
    };
  }, [restarting]);
  return (
    <main className="w-full relative">
      {restarting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-100/80 via-white/80 to-orange-200/80 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 backdrop-blur-md animate-fade-in px-2 sm:px-0">
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-10 bg-white/90 dark:bg-gray-900/90 rounded-xl sm:rounded-2xl shadow-2xl border border-orange-200 dark:border-gray-700 animate-pop-in w-full max-w-xs sm:max-w-md">
            <div className="relative flex items-center justify-center mb-2">
              <span className="absolute inline-flex h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-tr from-orange-400 via-orange-200 to-orange-500 opacity-30 animate-pulse"></span>
              <svg
                className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 animate-spin-slow drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-orange-700 dark:text-orange-200 tracking-wide animate-pulse">
              Restarting...
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-orange-600 dark:text-orange-300 animate-bounce">
              {restartCountdown}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 text-center">
              System will be back in {restartCountdown} second
              {restartCountdown !== 1 ? "s" : ""}.
            </span>
          </div>
          <style jsx global>{`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .animate-fade-in {
              animation: fade-in 0.4s ease;
            }
            @keyframes pop-in {
              0% {
                transform: scale(0.95);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-pop-in {
              animation: pop-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @keyframes spin-slow {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin-slow 1.5s linear infinite;
            }
          `}</style>
        </div>
      )}
      {rebooting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-100/80 via-white/80 to-red-200/80 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 backdrop-blur-md animate-fade-in px-2 sm:px-0">
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-10 bg-white/90 dark:bg-gray-900/90 rounded-xl sm:rounded-2xl shadow-2xl border border-red-200 dark:border-gray-700 animate-pop-in w-full max-w-xs sm:max-w-md">
            <div className="relative flex items-center justify-center mb-2">
              <span className="absolute inline-flex h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-tr from-red-400 via-red-200 to-red-500 opacity-30 animate-pulse"></span>
              <svg
                className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 animate-spin-slow drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-200 tracking-wide animate-pulse">
              Rebooting...
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-red-600 dark:text-red-300 animate-bounce">
              {rebootCountdown}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 text-center">
              System will be back in {rebootCountdown} second
              {rebootCountdown !== 1 ? "s" : ""}.
            </span>
          </div>
          <style jsx global>{`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .animate-fade-in {
              animation: fade-in 0.4s ease;
            }
            @keyframes pop-in {
              0% {
                transform: scale(0.95);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-pop-in {
              animation: pop-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @keyframes spin-slow {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin-slow 1.5s linear infinite;
            }
          `}</style>
        </div>
      )}
      <section className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 tracking-tight">
          <span>System Settings</span>
        </h2>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700 dark:text-white">
            System Status
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
            {/* Server Card */}
            <div
              className={`flex-1 rounded-lg p-4 flex items-center gap-3 border transition-colors duration-300 ${
                serverOnline
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full inline-block ${
                  serverOnline ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <div>
                <div
                  className={`font-semibold ${
                    serverOnline ? "text-green-800" : "text-red-800"
                  }`}
                >
                  Server
                </div>
                <div
                  className={`$${
                    serverOnline ? "text-green-700" : "text-red-700"
                  } text-sm`}
                >
                  {serverOnline ? "Online" : "Offline"}
                </div>
              </div>
              <label className="ml-auto relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={serverOnline}
                  onChange={() => setServerOnline((prev) => !prev)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-50 rounded-full peer dark:bg-gray-700 transition-colors duration-200 ${
                    serverOnline ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                    serverOnline ? "translate-x-5" : ""
                  }`}
                ></div>
              </label>
            </div>
            {/* Database Card */}
            <div
              className={`flex-1 rounded-lg p-4 flex items-center gap-3 border transition-colors duration-300 ${
                dbConnected
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full inline-block ${
                  dbConnected ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <div>
                <div
                  className={`font-semibold ${
                    dbConnected ? "text-green-800" : "text-red-800"
                  }`}
                >
                  Database
                </div>
                <div
                  className={`$${
                    dbConnected ? "text-green-700" : "text-red-700"
                  } text-sm`}
                >
                  {dbConnected ? "Connected" : "Disconnected"}
                </div>
              </div>
              {/* Modern Toggle Switch aligned right */}
              <label className="ml-auto relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dbConnected}
                  onChange={() => setDbConnected((prev) => !prev)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-50 rounded-full peer dark:bg-gray-700 transition-colors duration-200 ${
                    dbConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                    dbConnected ? "translate-x-5" : ""
                  }`}
                ></div>
              </label>
            </div>
            {/* Network Card */}
            <div
              className={`flex-1 rounded-lg p-4 flex items-center gap-3 border transition-colors duration-300 ${
                internetConnected
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full inline-block ${
                  internetConnected ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <div>
                <div
                  className={`font-semibold ${
                    internetConnected ? "text-green-800" : "text-red-800"
                  }`}
                >
                  Network
                </div>
                <div
                  className={`${
                    internetConnected ? "text-green-700" : "text-red-700"
                  } text-sm`}
                >
                  {internetConnected ? "Connected" : "Disconnected"}
                </div>
              </div>
              <label className="ml-auto relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={internetConnected}
                  onChange={() => setInternetConnected((prev) => !prev)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-50 rounded-full peer dark:bg-gray-700 transition-colors duration-200 ${
                    internetConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                    internetConnected ? "translate-x-5" : ""
                  }`}
                ></div>
              </label>
            </div>
            <div
              className={`flex-1 rounded-lg p-4 flex items-center gap-3 border transition-colors duration-300 ${
                authActive
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full inline-block ${
                  authActive ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <div>
                <div
                  className={`font-semibold ${
                    authActive ? "text-green-800" : "text-red-800"
                  }`}
                >
                  Authentication
                </div>
                <div
                  className={`${
                    authActive ? "text-green-700" : "text-red-700"
                  } text-sm`}
                >
                  {authActive ? "Active" : "Inactive"}
                </div>
              </div>
              <label className="ml-auto relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={authActive}
                  onChange={() => setAuthActive((prev) => !prev)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-50 rounded-full peer dark:bg-gray-700 transition-colors duration-200 ${
                    authActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                    authActive ? "translate-x-5" : ""
                  }`}
                ></div>
              </label>
            </div>
            <div
              className={`flex-1 rounded-lg p-4 flex items-center gap-3 border transition-colors duration-300 ${
                apiActive
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full inline-block ${
                  apiActive ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <div>
                <div
                  className={`font-semibold ${
                    apiActive ? "text-green-800" : "text-red-800"
                  }`}
                >
                  API
                </div>
                <div
                  className={`${
                    apiActive ? "text-green-700" : "text-red-700"
                  } text-sm`}
                >
                  {apiActive ? "Operational" : "Down"}
                </div>
              </div>
              <label className="ml-auto relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={apiActive}
                  onChange={() => setApiActive((prev) => !prev)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-50 rounded-full peer dark:bg-gray-700 transition-colors duration-200 ${
                    apiActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
                    apiActive ? "translate-x-5" : ""
                  }`}
                ></div>
              </label>
            </div>
          </div>
          <div className="mt-4 sm:mt-6">
            <h4 className="font-semibold text-gray-700 dark:text-white mb-2 text-base sm:text-lg">
              Quick Actions
            </h4>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Show Start System button only if all are false */}
              {!authActive &&
              !apiActive &&
              !dbConnected &&
              !internetConnected &&
              !serverOnline ? (
                <button
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2 justify-center"
                  onClick={handleStartSystem}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Start System
                </button>
              ) : (
                <>
                  <button
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2 justify-center"
                    onClick={() => window.location.reload()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114.9-2M20 14a8 8 0 01-14.9 2"
                      />
                    </svg>
                    Refresh System
                  </button>
                  <button
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2 justify-center"
                    onClick={handleRestart}
                    disabled={restarting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6l4 2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                    Restart System
                  </button>
                  <button
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2 justify-center"
                    onClick={handleReboot}
                    disabled={rebooting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"
                      />
                    </svg>
                    Reboot System
                  </button>
                  <button
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold shadow transition-all duration-200 flex items-center gap-2 justify-center"
                    onClick={handleEmergencyShutdown}
                    disabled={rebooting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Emergency Shutdown
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 text-yellow-700 bg-yellow-50 border-l-4 border-yellow-400 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
              <span className="font-bold">Note:</span> Every single change you
              make here WILL be permanently recorded in the logbook.
            </div>
            <div className="mt-4 text-red-700 bg-red-50 border-l-4 border-red-400 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
              <span className="font-bold">Warning:</span> You have opened this
              tab, and this action has been recorded in the logbook.
            </div>
          </div>
          <Link
            href="/guidebook"
            className="inline-block mb-4 mt-4 sm:mb-6 text-blue-600 dark:text-blue-400 font-medium text-base sm:text-lg"
          >
            📘 Open System Guidebook
          </Link>
        </div>
      </section>
    </main>
  );
}
