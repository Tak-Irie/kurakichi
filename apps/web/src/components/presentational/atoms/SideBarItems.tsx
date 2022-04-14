import Link from 'next/link';
import { FC, ReactElement } from 'react';

type SideBarItemsProps = {
  link: string;
  label: string;
  icon: ReactElement;
};

export const SideBarItems: FC<SideBarItemsProps> = (props) => {
  const { link, icon, label } = props;

  return (
    <Link href={link} passHref>
      <a
        href="replace"
        className="group flex items-center p-2 text-base font-medium text-gray-900 bg-gray-100 rounded-md"
        aria-current="page"
      >
        {icon}
        {label}
      </a>
    </Link>
  );
};
