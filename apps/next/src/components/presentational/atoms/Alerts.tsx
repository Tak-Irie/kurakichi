import { FC } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

type AlertsProps = {
  label: string;
};

const Alerts: FC<AlertsProps> = (props) => {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0 h-5 w-5 text-yellow-400">
          <ExclamationIcon />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{props.label}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{props.children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Alerts };
