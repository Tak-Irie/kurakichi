import { FC } from 'react';
import Link from 'next/link';

const LightningSVG: FC = () => {
  return (
    <div className="mr-2">
      <svg
        className="w-6 h-6 text-deep-purple-accent-400 sm:w-8 sm:h-8"
        stroke="currentColor"
        viewBox="0 0 52 52"
      >
        <polygon
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          points="29 13 14 29 25 29 23 39 38 23 27 23"
        />
      </svg>
    </div>
  );
};

const DownwardCurveSVG: FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-0">
      <svg
        viewBox="0 0 224 12"
        fill="currentColor"
        className="w-full -mb-1 text-pink-50"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
      </svg>
    </div>
  );
};

const MenuSVG: FC = () => {
  return (
    <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
      />
      <path
        fill="currentColor"
        d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
      />
      <path
        fill="currentColor"
        d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
      />
    </svg>
  );
};

const DownArrowInCircleSVG: FC = () => {
  return (
    <Link href="/">
      <button
        aria-label="Scroll down"
        className="flex items-center justify-center w-10 h-10 mx-auto text-black duration-300 transform border border-black rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
        </svg>
      </button>
    </Link>
  );
};

export { LightningSVG, DownwardCurveSVG, DownArrowInCircleSVG, MenuSVG };
