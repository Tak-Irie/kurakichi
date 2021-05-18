import { FC, ReactElement } from 'react';
import Link from 'next/link';

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
        className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
        aria-current="page"
      >
        {icon}
        {label}
      </a>
    </Link>
  );
};
