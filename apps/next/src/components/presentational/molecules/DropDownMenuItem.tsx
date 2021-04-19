import { FC, ReactElement } from 'react';
import Link from 'next/link';

import { Menu } from '@headlessui/react';

type DropDownMenuItemProps = {
  linkUrl: string;
  icon: ReactElement;
  label: string;
  // isOpen?: boolean;
  // onClick?: () => void;
};

export const DropDownMenuItem: FC<DropDownMenuItemProps> = ({ linkUrl, icon, label }) => {
  return (
    <Menu.Item>
      <Link href={linkUrl} passHref>
        <a
          href={linkUrl}
          className="group flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          role="menuitem"
        >
          <span className="mr-3 mb-1 h-5 w-5 text-gray-500 group-hover:text-gray-700">{icon}</span>
          <span>{label}</span>
        </a>
      </Link>
    </Menu.Item>
  );
};
