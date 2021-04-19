import { FC, ReactElement } from 'react';
import { XIcon, CheckCircleIcon, ExclamationIcon, BanIcon } from '@heroicons/react/outline';

type NotificationProps = {
  icon?: ReactElement;
  iconColor?: string;
  onClick?: () => void;
  label: string;
};

export const Notification: FC<NotificationProps> = (props) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className={`flex-shrink-0 h-6 w-6 ${props.iconColor}`}>{props.icon}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{props.label}</p>
              <p className="mt-1 text-sm text-gray-500">{props.children}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={props.onClick}
                className="h-5 w-5 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <XIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationSuccess: FC = (props) => {
  return (
    <Notification label="Success!!" icon={<CheckCircleIcon />} iconColor="text-green-400">
      {props.children}
    </Notification>
  );
};

export const NotificationCaution: FC = (props) => {
  return (
    <Notification label="Caution!" icon={<ExclamationIcon />} iconColor="text-yellow-500">
      {props.children}
    </Notification>
  );
};

export const NotificationAlert: FC = (props) => {
  return (
    <Notification label="Alert!" icon={<BanIcon />} iconColor="text-red-500">
      {props.children}
    </Notification>
  );
};
