import React from 'react';

const NotfoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-9xl font-bold mb-8">404</div>
      <div className="text-4xl mb-8">Page Not Found</div>
      <div className="animate-bounce mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-xl font-semibold transition duration-300 ease-in-out"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotfoundPage;
