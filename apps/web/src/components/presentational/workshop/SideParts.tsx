import { FC } from 'react';

export const SideParts: FC = () => {
  return (
    <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
      <div>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
          alt="Workflow"
        />
      </div>
      <div>
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
