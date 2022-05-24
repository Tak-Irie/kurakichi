import { Listbox, Transition } from '@headlessui/react';
import { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { InquiryStatusModel } from '../../../lib';

import { IconsCheck, IconsSelector } from '../atoms';
import { BadgeInquiryStatus } from '../molecules';

type BadgeInquiryStatusChangeableProps = {
  status: InquiryStatusModel;
  size: 'large' | 'small';
  handleChange: Dispatch<SetStateAction<InquiryStatusModel>>;
};

const inquiryStatus = [
  { en: 'UNREAD', jp: '未読' },
  { en: 'DONE', jp: '対応済' },
  { en: 'WORKING', jp: '対応中' },
  { en: 'DRAFT', jp: '作成中' },
];
export const BadgeInquiryStatusChangeable: FC<
  BadgeInquiryStatusChangeableProps
> = ({ status, size, handleChange }) => (
  <Listbox value={status} onChange={handleChange}>
    <div className="relative">
      <Listbox.Button className="relative w-full cursor-default">
        <span className="block truncate">
          <BadgeInquiryStatus size={size} status={status} />
        </span>
        <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
          <IconsSelector />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm">
          {inquiryStatus.map((value) => (
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
                  <span
                    className={`${
                      selected ? 'font-medium' : 'font-normal'
                    } block truncate`}
                  >
                    {value.jp}
                  </span>
                  {selected ? (
                    <span
                      className={`${
                        active ? 'text-yellow-600' : 'text-yellow-600'
                      }
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
