import { SideBarItems } from '@next/ui';
import {
  XIcon,
  HomeIcon,
  CalendarIcon,
  EmojiHappyIcon,
  MapIcon,
  CogIcon,
} from '@heroicons/react/outline';
import { FC } from 'react';

export const SideBar: FC = () => {
  return (
    <div className="fixed inset-0 flex z-40 hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
      <div className="hidden relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close sidebar</span>
            <XIcon />
          </button>
        </div>

        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
              alt="Workflow"
            />
          </div>
          <nav aria-label="Sidebar" className="mt-5">
            <div className="px-2 space-y-1">
              <SideBarItems link="/" label="DashBoard" icon={<HomeIcon />} />
              <SideBarItems link="/" label="Calendar" icon={<CalendarIcon />} />
              <SideBarItems link="/" label="Teams" icon={<EmojiHappyIcon />} />
              <SideBarItems link="/" label="Office Map" icon={<MapIcon />} />
            </div>
            <div className="divide" />
            <div className="px-2 space-y-1">
              <SideBarItems link="/" label="Setting" icon={<CogIcon />} />
            </div>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="/" className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=bYR969hCec&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                  Tom Cook
                </p>
                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
    </div>
  );
};
