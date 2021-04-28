import { FC } from 'react';

export const LoadingCard: FC = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-blue-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-400 rounded"></div>
            <div className="h-4 bg-blue-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingStylishSpinner: FC = () => {
  return (
    <svg className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900" />
  );
};

// FIXME:create simple version
export const LoadingSimpleSpinner: FC = () => {
  return (
    <svg className="animate-spin rounded-full w-10 h-10 border-t-2 border-b-2 border-pink-600" />
  );
};
