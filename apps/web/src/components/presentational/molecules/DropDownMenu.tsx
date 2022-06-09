import { FC, Fragment, ReactElement, ReactNode } from 'react';

import { Menu, Transition } from '@headlessui/react';

type DropDownMenuProps = {
  menuElement: ReactElement;
  menuIcon: ReactElement;
  menuItems: ReactElement;
  isOpen?: boolean;
  children?: ReactNode;
};

export const DropDownMenu: FC<DropDownMenuProps> = ({
  menuElement,
  menuIcon,
  // menuItems,
  children,
  // isOpen,
}) => (
  <div className="z-10">
    <Menu>
      {({ open }: { open: any }) => (
        <>
          <Menu.Button className="flex items-center">
            {menuElement}
            {menuIcon}
          </Menu.Button>
          <Transition
            show={open}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-auto bg-white rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right"
            >
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  </div>
);
export const DropDownMenu2: FC<DropDownMenuProps> = ({
  menuElement,
  menuIcon,
  menuItems,
}) => (
  <div className="z-10">
    <Menu as="div">
      <Menu.Button className="flex items-center">
        {menuElement}
        {menuIcon}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items
          static
          className="absolute right-0 mt-2 w-auto bg-white rounded-md focus:outline-none ring-black/5 shadow-lg origin-top-right"
        >
          {menuItems}
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);

export const DropdownMenu3: FC = () => (
  <Menu>
    <Menu.Button>More</Menu.Button>
    <Menu.Items>
      <Menu.Item>
        {({ active }: { active: boolean }) => (
          <a className={`${active && 'bg-blue-500'}`} href="/account-settings">
            Account settings
          </a>
        )}
      </Menu.Item>
      <Menu.Item disabled>
        <span className="opacity-75">Invite a friend (coming soon!)</span>
      </Menu.Item>
    </Menu.Items>
  </Menu>
);
