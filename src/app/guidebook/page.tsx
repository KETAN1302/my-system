"use client";

export default function GuidebookPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-0 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center py-8 sm:py-10 px-2 sm:px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 dark:from-blue-900 dark:via-blue-800 dark:to-green-900 shadow-lg">
        <div className="max-w-2xl w-full flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap justify-center">
            <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 dark:bg-gray-900/30">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4h16v16H4z"
                />
              </svg>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-center">
              System Guidebook
            </h1>
          </div>
          <p className="text-white/90 text-base sm:text-xl text-center max-w-xs sm:max-w-xl mb-2">
            Your reference for safe and effective use of the system dashboard
          </p>
        </div>
      </section>
      {/* Main Content */}
      <div className="max-w-4xl w-full bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-2xl p-3 sm:p-6 md:p-10 mt-6 sm:mt-8 mb-6 sm:mb-10">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4h16v16H4z"
            />
          </svg>
          Dashboard Usage Guide
        </h2>
        <ul className="space-y-4 sm:space-y-6 text-gray-800 dark:text-gray-100">
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>System Status:</b> The dashboard shows the real-time status of
              all major system components.{" "}
              <span className="text-green-600 font-semibold">Green</span> means
              operational,{" "}
              <span className="text-red-600 font-semibold">Red</span> means an
              issue. Toggle switches allow you to simulate status changes for
              testing.
            </div>
          </li>
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>Quick Actions:</b> Use the action buttons to{" "}
              <span className="font-semibold">Refresh</span> (reloads the
              dashboard), <span className="font-semibold">Restart</span> (soft
              reset), <span className="font-semibold">Reboot</span> (full system
              cycle), or{" "}
              <span className="font-semibold">Emergency Shutdown</span> (turns
              off all components). Only use emergency shutdown in critical
              situations.
            </div>
          </li>
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
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
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>Restart vs Reboot:</b>{" "}
              <span className="font-medium">Restart</span> is a soft reset
              (shorter downtime), while{" "}
              <span className="font-medium">Reboot</span> is a full system cycle
              (longer downtime). Both show a countdown overlay. Wait for the
              overlay to disappear before taking further actions.
            </div>
          </li>
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>Emergency Shutdown:</b> This will turn off all system
              components. Use the green{" "}
              <span className="font-medium">Start System</span> button to
              restore normal operation.{" "}
              <span className="text-red-600 font-semibold">Warning:</span> All
              services will be unavailable until restarted.
            </div>
          </li>
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>Start System:</b> When all components are off, click{" "}
              <span className="text-green-700 font-semibold">Start System</span>{" "}
              to bring everything back online. Wait for all status indicators to
              turn green before using the system.
            </div>
          </li>
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-yellow-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>Logbook:</b> All actions are permanently recorded for audit and
              troubleshooting. Review the logbook for a history of changes and
              to help diagnose issues.
            </div>
          </li>
          <li className="flex gap-2 sm:gap-3 items-start">
            <span className="mt-0.5">
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L7.464 7.464"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <div className="text-sm sm:text-base">
              <b>Best Practices:</b>{" "}
              <ul className="list-disc ml-5 mt-1 space-y-1 text-sm">
                <li>Check component status before taking action.</li>
                <li>
                  Avoid frequent shutdowns or reboots to ensure system
                  stability.
                </li>
                <li>
                  Use Emergency Shutdown only if the system is unresponsive or
                  in a critical state.
                </li>
                <li>
                  Wait for overlays to disappear before performing new actions.
                </li>
                <li>
                  Contact your system administrator for persistent issues.
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="mt-8 sm:mt-10 p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 text-blue-900 dark:text-blue-100 text-xs sm:text-sm flex items-center gap-2 flex-wrap">
          <svg
            className="h-5 w-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>
            For further assistance, contact your system administrator or refer
            to the official documentation.
          </span>
        </div>
      </div>
    </main>
  );
}
