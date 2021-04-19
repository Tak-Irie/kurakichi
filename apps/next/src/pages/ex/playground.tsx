import { NextPage } from 'next';
import { Fragment } from 'react';
import {
  Avatar,
  AvatarSmall,
  ActivityTable,
  IconsCaution,
  PopOnIcon,
  ButtonBig,
  MessageForm,
  TableHead,
  TableData,
} from '@next/ui';
import { SendMessage } from '@next/container';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { tailwindJoin } from '@kurakichi/node-util';
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

const PlayGround: NextPage = () => {
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Jobs', href: '#', current: false },
    { name: 'Applicants', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
  ];
  const user = {
    name: 'Debbie Lewis',
    handle: 'deblewis',
    email: 'debbielewis@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
  };
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];
  return (
    <div>
      <Disclosure as="div" className="relative bg-green-400 pb-32 overflow-hidden">
        {({ open }) => (
          <>
            <nav
              className={tailwindJoin(
                open ? 'bg-light-blue-900' : 'bg-transparent',
                'relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none',
              )}
            >
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-light-blue-800">
                  <div className="px-2 flex items-center lg:px-0">
                    <div className="flex-shrink-0">
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden lg:block lg:ml-6 lg:space-x-4">
                      <div className="flex">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={tailwindJoin(
                              item.current ? 'bg-black bg-opacity-25' : 'hover:bg-light-blue-800',
                              'rounded-md py-2 px-3 text-sm font-medium text-white',
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-light-blue-100 focus-within:text-gray-400">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-light-blue-700 bg-opacity-50 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 placeholder-light-blue-100 focus:outline-none focus:bg-white focus:ring-white focus:border-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="p-2 rounded-md inline-flex items-center justify-center text-light-blue-200 hover:text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block flex-shrink-0 h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block flex-shrink-0 h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex items-center">
                      <button className="flex-shrink-0 rounded-full p-1 text-light-blue-200 hover:bg-light-blue-800 hover:text-white focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative flex-shrink-0 ml-4">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="rounded-full flex text-sm text-white focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="rounded-full h-8 w-8" src={user.imageUrl} alt="" />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={tailwindJoin(
                                          active ? 'bg-gray-100' : '',
                                          'block py-2 px-4 text-sm text-gray-700',
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="bg-light-blue-900 lg:hidden">
                <div className="pt-2 pb-3 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={tailwindJoin(
                        item.current ? 'bg-black bg-opacity-25' : 'hover:bg-light-blue-800',
                        'block rounded-md py-2 px-3 text-base font-medium text-white',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-light-blue-800">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img className="rounded-full h-10 w-10" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.name}</div>
                      <div className="text-sm font-medium text-light-blue-200">{user.email}</div>
                    </div>
                    <button className="ml-auto flex-shrink-0 rounded-full p-1 text-light-blue-200 hover:bg-light-blue-800 hover:text-white focus:outline-none focus:bg-light-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-900 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-light-blue-200 hover:text-white hover:bg-light-blue-800"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </nav>
            <div
              className={tailwindJoin(
                open ? 'bottom-0' : 'inset-y-0',
                'absolute flex justify-center inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0',
              )}
              aria-hidden="true"
            >
              <div className="flex-grow bg-light-blue-900 bg-opacity-75" />
              <svg
                className="flex-shrink-0"
                width={1750}
                height={308}
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path opacity=".75" d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#075985" />
                <path opacity=".75" d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0c4a6e" />
              </svg>
              <div className="flex-grow bg-light-blue-800 bg-opacity-75" />
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PlayGround;
