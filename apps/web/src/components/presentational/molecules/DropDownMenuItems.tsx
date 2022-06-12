import Link from 'next/link';
import { FC, ReactElement } from 'react';

import { Menu } from '@headlessui/react';

type DropDownMenuItemProps = {
  icon: ReactElement;
  label: string;
  linkUrl: string;
  linkAs?: string;
  onClick: () => void | Promise<void>;
  // isOpen?: boolean;
};

export const DropDownMenuItem: FC<Omit<DropDownMenuItemProps, 'onClick'>> = ({
  linkUrl,
  linkAs,
  icon,
  label,
}) => (
  <Menu.Item>
    <Link href={linkUrl} as={linkAs} passHref>
      <a
        href="replace"
        className="group flex items-center py-2 px-4 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        <div className="mr-3 mb-1 w-5 h-5 text-gray-500 group-hover:text-gray-700">
          {icon}
        </div>
        <div>{label}</div>
      </a>
    </Link>
  </Menu.Item>
);

export const DropDownMenuItemButton: FC<
  Omit<DropDownMenuItemProps, 'linkUrl'>
> = ({ onClick, icon, label }) => (
  <Menu.Item>
    <button
      type="button"
      className="group flex items-center py-2 px-4 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      role="menuitem"
      onClick={onClick}
    >
      <div className="mr-3 mb-1 w-5 h-5 text-gray-500 group-hover:text-gray-700">
        {icon}
      </div>
      <div>{label}</div>
    </button>
  </Menu.Item>
);
