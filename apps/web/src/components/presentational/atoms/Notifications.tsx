import { FC, ReactElement, useEffect, useState } from 'react';
import { XIcon, CheckCircleIcon, ExclamationIcon, BanIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';

type NotificationProps = {
  icon?: ReactElement;
  iconColor?: string;
  onClick?: () => void;
  label: string;
  content: string;
  showingMS?: number;
};

export const Notification: FC<NotificationProps> = ({
  content,
  label,
  icon,
  iconColor,
  showingMS = 1000 * 10,
  onClick,
}) => {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsShowing(false);
    }, showingMS);
  }, [isShowing, showingMS]);

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        aria-live="assertive"
        className="z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
      >
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 h-6 w-6 ${iconColor}`}>{icon}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="mt-1 text-sm text-gray-500">{content}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => setIsShowing(!isShowing)}
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
    </Transition>
  );
};

export const NotificationSuccess: FC<NotificationProps> = ({
  label = 'Success!!',
  content,
  onClick,
  showingMS,
}) => {
  return (
    <Notification
      onClick={onClick}
      content={content}
      label={label}
      icon={<CheckCircleIcon />}
      iconColor="text-green-400"
      showingMS={showingMS}
    />
  );
};

export const NotificationCaution: FC<NotificationProps> = ({
  label = 'Caution!',
  content,
  onClick,
  showingMS,
}) => {
  return (
    <Notification
      onClick={onClick}
      content={content}
      label={label}
      icon={<ExclamationIcon />}
      iconColor="text-yellow-500"
      showingMS={showingMS}
    />
  );
};

export const NotificationAlert: FC<NotificationProps> = ({
  label = 'Alert!',
  content,
  onClick,
  showingMS,
}) => {
  return (
    <Notification
      onClick={onClick}
      content={content}
      label={label}
      icon={<BanIcon />}
      iconColor="text-red-500"
      showingMS={showingMS}
    />
  );
};
