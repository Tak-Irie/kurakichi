import { VFC } from 'react';

type LoadingProps = {
  color?: string;
  height?: string;
  width?: string;
};

export const LoadingCard: VFC<LoadingProps> = ({ color }) => {
  return (
    <div className="p-4 mx-auto w-full max-w-sm rounded-md border border-blue-300 shadow">
      <div className="flex space-x-4 animate-pulse">
        <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
        <div className="flex-1 py-1 space-y-4">
          <div className="w-3/4 h-4 bg-blue-400 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-400 rounded"></div>
            <div className="w-5/6 h-4 bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner: VFC<LoadingProps> = ({
  color = 'gray',
  height = 'h-10',
  width = 'w-10',
}) => {
  return (
    <svg
      className={`animate-spin flex-shrink rounded-full ${height} ${width} border-t-2 border-b-2 border-${color}-900`}
    />
  );
};
