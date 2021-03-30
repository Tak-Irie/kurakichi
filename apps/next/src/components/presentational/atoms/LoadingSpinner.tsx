import { FC } from 'react';

const LoadingStylishSpinner: FC = () => {
  return (
    <div className=" h-auto w-auto flex">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

// FIXME:create simple version
const LoadingSimpleSpinner: FC = () => {
  return (
    <div className=" h-auto w-auto flex">
      <div className="animate-spin rounded-full w-10 h-10 border-t-2 border-b-2 border-pink-600"></div>
    </div>
  );
};

export { LoadingStylishSpinner, LoadingSimpleSpinner };
