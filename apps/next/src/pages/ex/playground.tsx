import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { Dialog, Transition, Popover, Listbox } from '@headlessui/react';
import {
  BellIcon,
  BookmarkAltIcon,
  CashIcon,
  CogIcon,
  FireIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
  MenuIcon,
  PhotographIcon,
  SearchCircleIcon,
  UserIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ArticlesWelfareGuide } from '@next/ui';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: '',
  },
];

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
];

const PlayGround: NextPage = () => {
  return (
    <div className="h-96 bg-gray-200">
      <div className="bg-white border border-gray-400 p-10 mx-10">
        <List2 />
      </div>
      <div className="bg-white border border-gray-400 p-10 mx-10">
        <MyListbox />
      </div>
      <div className="bg-white border border-gray-400 p-10 mt-10 mx-10">
        <Popover className="relative bg-blue-300">
          <Popover.Button>Solutions</Popover.Button>

          <Popover.Panel className="absolute z-10">
            <div className="grid grid-cols-2 bg-red-300">
              <a href="/analytics">Analytics</a>
              <a href="/engagement">Engagement</a>
              <a href="/security">Security</a>
              <a href="/integrations">Integrations</a>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

export function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export function List2() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="w-72 top-16">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-blue-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-yellow-900 bg-yellow-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-yellow-600' : 'text-yellow-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default PlayGround;
