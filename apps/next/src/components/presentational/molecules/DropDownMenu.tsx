import { FC, VFC, ReactElement, Fragment } from 'react';

import { Transition, Menu } from '@headlessui/react';

type DropDownMenuProps = {
  menuElement: ReactElement;
  menuIcon: ReactElement;
  menuItems: ReactElement;
  isOpen?: boolean;
};

export const DropDownMenu: FC<DropDownMenuProps> = (props) => {
  return (
    <div className="z-10">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center">
              {props.menuElement}
              {props.menuIcon}
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
                className="origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {props.children}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
export const DropDownMenu2: VFC<DropDownMenuProps> = ({ menuElement, menuIcon, menuItems }) => {
  return (
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
            className="origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {menuItems}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
