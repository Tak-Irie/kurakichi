import { FC } from 'react';

const LoadingStylishSpinner: FC = () => {
  return (
    <div className="flex animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
  );
};

// FIXME:create simple version
const LoadingSimpleSpinner: FC = () => {
  return (
    <div className="flex animate-spin rounded-full w-10 h-10 border-t-2 border-b-2 border-pink-600"></div>
  );
};

export { LoadingStylishSpinner, LoadingSimpleSpinner };
