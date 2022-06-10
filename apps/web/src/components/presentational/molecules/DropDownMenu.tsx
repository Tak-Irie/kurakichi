import { FC, Fragment, ReactElement } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

type DropDownMenuProps = {
  menuElement: ReactElement;
  items: ItemProps[];
};

type ItemProps = {
  itemLabel: string;
  icon?: ReactElement;
  url?: string;
  onClick?: () => void | Promise<void>;
};

export const Item: FC<ItemProps> = ({ itemLabel, icon, url, onClick }) => {
  const router = useRouter();
  return (
    <Menu.Item>
      {({ active }: { active: boolean }) => (
        <div
          className={`${
            active ? 'bg-slate-100' : 'text-gray-900'
          } flex rounded-md px-2 py-2 text-sm`}
        >
          {url ? (
            <button
              type="button"
              className="flex"
              onClick={() => router.push(url)}
            >
              {icon}
              {itemLabel}
            </button>
          ) : (
            <button type="button" className="flex" onClick={onClick}>
              {icon}
              {itemLabel}
            </button>
          )}
        </div>
      )}
    </Menu.Item>
  );
};

export const DropDownMenu: FC<DropDownMenuProps> = ({ menuElement, items }) => (
  <Menu as="div" className="relative text-left">
    <div>
      <Menu.Button className="w-full text-sm font-medium rounded-md">
        {menuElement}
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
      <Menu.Items className="absolute right-0 mt-2 w-36 bg-white rounded-md divide-y divide-gray-100 focus:outline-none ring-1 ring-black/5 shadow-lg origin-top-right">
        <div className="p-1 ">
          {items?.map((item) => (
            <Item
              key={item.itemLabel}
              itemLabel={item.itemLabel}
              icon={item.icon}
              url={item.url}
              onClick={item.onClick}
            />
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);
