import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="p-4 rounded-md bg-red-50">
    <div className="flex">
      <div className="shrink-0">
        <svg
          className="text-red-400 size-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2C5.58 2 2 5.58 2 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6zM9 7h2v5H9V7zm2 7a1 1 0 11-2 0 1 1 0 012 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">{message}</h3>
      </div>
    </div>
  </div>
);