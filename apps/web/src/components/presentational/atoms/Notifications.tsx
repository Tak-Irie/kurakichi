import { Transition } from '@headlessui/react';
import {
  BanIcon,
  CheckCircleIcon,
  ExclamationIcon,
  XIcon,
} from '@heroicons/react/outline';
import { FC, ReactElement, useEffect, useState } from 'react';

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
  showingMS = 1000 * 5,
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
        className="flex fixed inset-0 z-50 justify-center items-end py-6 px-4 pointer-events-none sm:justify-end sm:items-start sm:p-6"
      >
        <div className="overflow-hidden w-full max-w-sm bg-white rounded-lg ring-1 ring-black/5 shadow-lg pointer-events-auto">
          <div className="p-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 h-6 w-6 ${iconColor}`}>{icon}</div>
              <div className="flex-1 pt-0.5 ml-3 w-0">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="mt-1 text-sm text-gray-500">{content}</p>
              </div>
              <div className="flex shrink-0 ml-4">
                <button
                  type="button"
                  onClick={() => setIsShowing(!isShowing)}
                  className="inline-flex w-5 h-5 text-gray-400 hover:text-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
}) => (
  <Notification
    onClick={onClick}
    content={content}
    label={label}
    icon={<CheckCircleIcon />}
    iconColor="text-green-400"
    showingMS={showingMS}
  />
);

export const NotificationCaution: FC<NotificationProps> = ({
  label = 'Caution!',
  content,
  onClick,
  showingMS,
}) => (
  <Notification
    onClick={onClick}
    content={content}
    label={label}
    icon={<ExclamationIcon />}
    iconColor="text-yellow-500"
    showingMS={showingMS}
  />
);

export const NotificationAlert: FC<NotificationProps> = ({
  label = 'Alert!',
  content,
  onClick,
  showingMS,
}) => (
  <Notification
    onClick={onClick}
    content={content}
    label={label}
    icon={<BanIcon />}
    iconColor="text-red-500"
    showingMS={showingMS}
  />
);
