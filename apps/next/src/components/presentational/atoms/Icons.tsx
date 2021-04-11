import { FC } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

export const IconsCaution: FC = (props) => {
  return (
    <div className="flex-shrink-0 h-6 w-6 text-yellow-500">
      <ExclamationIcon />
    </div>
  );
};
