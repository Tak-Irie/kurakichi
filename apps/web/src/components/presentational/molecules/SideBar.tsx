import {
  CalendarIcon,
  CogIcon,
  EmojiHappyIcon,
  HomeIcon,
  MapIcon,
  XIcon,
} from '@heroicons/react/outline';
import { FC } from 'react';
import { SideBarItems } from '../atoms';

export const SideBar: FC = () => {
  return (
    <div className="flex fixed inset-0 z-40" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-600/75" aria-hidden="true"></div>
      <div className="flex relative flex-col flex-1 w-full max-w-xs bg-white focus:outline-none">
        <div className="absolute top-0 right-0 pt-2 -mr-12">
          <button
            type="button"
            className="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close sidebar</span>
            <XIcon />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pt-5 pb-4 h-0">
          <div className="flex shrink-0 items-center px-4">
            <img
              className="w-auto h-8"
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
            <div className="px-2 space-y-1">
              <SideBarItems link="/" label="Setting" icon={<CogIcon />} />
            </div>
          </nav>
        </div>
        <div className="flex shrink-0 p-4 border-t border-gray-200">
          <a href="/" className="group block shrink-0">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block w-10 h-10 rounded-full"
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
      <div className="shrink-0 w-14" aria-hidden="true"></div>
    </div>
  );
};
