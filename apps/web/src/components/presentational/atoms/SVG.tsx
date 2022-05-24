import Link from 'next/link';
import { FC } from 'react';

export const LoadingSpinnerSVG: FC = () => (
    <svg
      className="mr-3 w-5 h-5 animate-spin"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z" />
    </svg>
  );

export const XMarkSVG: FC = () => (
    <svg className="w-5 text-gray-600 bg-black" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
      />
    </svg>
  );

export const LightningSVG: FC = () => (
    <div className="mr-2">
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8"
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

export const DownwardCurveSVG: FC = () => (
    <div className="absolute inset-x-0 bottom-0">
      <svg
        viewBox="0 0 224 12"
        fill="currentColor"
        className="-mb-1 w-full text-pink-50"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
      </svg>
    </div>
  );

export const HamburgerMenuSVG: FC = () => (
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

export const DownArrowInCircleSVG: FC = () => (
    <Link href="/">
      <button
        aria-label="Scroll down"
        className="flex justify-center items-center mx-auto w-10 h-10 text-black rounded-full border border-black hover:shadow duration-300 hover:scale-110"
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
