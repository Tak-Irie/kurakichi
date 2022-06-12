/* eslint-disable react/button-has-type */
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FC, Fragment, ReactNode } from 'react';

type ItemProps = {
  icon: ReactNode;
  buttonLabel: string;
};

export const Item: FC<ItemProps> = ({ buttonLabel, icon }) => (
  <Menu.Item>
    {({ active }: { active: boolean }) => (
      <button
        className={`${
          active ? 'bg-violet-500 text-white' : 'text-gray-900'
        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
      >
        {icon}
        {buttonLabel}
      </button>
    )}
  </Menu.Item>
);

const EditActiveIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 13V16H7L16 7L13 4L4 13Z"
      fill="#8B5CF6"
      stroke="#C4B5FD"
      strokeWidth="2"
    />
  </svg>
);

const DuplicateActiveIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 4H12V12H4V4Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
    <path d="M8 8H16V16H8V8Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
  </svg>
);

const ArchiveActiveIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5"
      y="8"
      width="10"
      height="8"
      fill="#8B5CF6"
      stroke="#C4B5FD"
      strokeWidth="2"
    />
    <rect
      x="4"
      y="4"
      width="12"
      height="4"
      fill="#8B5CF6"
      stroke="#C4B5FD"
      strokeWidth="2"
    />
    <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
  </svg>
);

export const Exp = () => (
  <div className="top-16 w-56 text-right">
    <Menu as="div" className="inline-block relative text-left">
      <div>
        <Menu.Button className="inline-flex justify-center py-2 px-4 w-full text-sm font-medium text-white bg-black/20 hover:bg-black/30 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          Options
          <ChevronDownIcon
            className="-mr-1 ml-2 w-5 h-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md divide-y divide-gray-100 focus:outline-none ring-1 ring-black/5 shadow-lg origin-top-right">
          <div className="p-1 ">
            <Item
              icon={
                <EditActiveIcon className="mr-2 w-5 h-5" aria-hidden="true" />
              }
              buttonLabel="Edit"
            />
            <Item
              icon={
                <DuplicateActiveIcon
                  className="mr-2 w-5 h-5"
                  aria-hidden="true"
                />
              }
              buttonLabel="Duplicate"
            />
            <Item
              icon={
                <ArchiveActiveIcon
                  className="mr-2 w-5 h-5"
                  aria-hidden="true"
                />
              }
              buttonLabel="Archive"
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);
