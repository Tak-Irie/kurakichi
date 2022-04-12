import { VFC, useState, Fragment, Dispatch, SetStateAction } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { InquiryStatus } from '../../../graphql';
import { BadgeInquiryStatus } from '..';
import { IconsCheck, IconsSelector } from '../atoms';

type BadgeInquiryStatusChangeableProps = {
  status: InquiryStatus;
  size: 'large' | 'small';
  handleChange: Dispatch<SetStateAction<InquiryStatus>>;
};

const _status = [
  { en: 'UNREAD', jp: '未読' },
  { en: 'DONE', jp: '対応済' },
  { en: 'WORKING', jp: '対応中' },
  { en: 'DRAFT', jp: '作成中' },
];
export const BadgeInquiryStatusChangeable: VFC<BadgeInquiryStatusChangeableProps> = ({
  status,
  size,
  handleChange,
}) => {
  return (
    <Listbox value={status} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default">
          <span className="block truncate">
            <BadgeInquiryStatus size={size} status={status} />
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <IconsSelector />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {_status.map((value) => (
              <Listbox.Option
                key={value.en}
                className={({ active }) =>
                  `${active ? 'text-yellow-900 bg-yellow-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={value.en}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                      {value.jp}
                    </span>
                    {selected ? (
                      <span
                        className={`${active ? 'text-yellow-600' : 'text-yellow-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <IconsCheck />
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
  );
};
