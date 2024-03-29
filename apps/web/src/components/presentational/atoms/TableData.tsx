import Link from 'next/link';
import { FC, ReactChild, ReactElement } from 'react';

type TableBodyProps = {
  link: string;
  title?: string;
  icon?: ReactElement;
  children?: ReactChild;
};

const TableDataWithLink: FC<TableBodyProps> = ({ icon, link, title }) => (
  <td className="py-4 px-6 w-full max-w-0 text-base text-gray-900 whitespace-nowrap">
    <div className="flex">
      <Link href={link} passHref>
        <a
          href="replace"
          className="group inline-flex items-center space-x-2 text-base truncate"
        >
          <div className="w-6 h-6 text-gray-500">{icon}</div>
          <p className="text-gray-500 group-hover:text-gray-900 truncate">
            {title}
          </p>
        </a>
      </Link>
    </div>
  </td>
);

const TableData: FC<Omit<TableBodyProps, 'link'>> = ({ title, children }) => (
  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
    {title ? (
      <div className="font-medium text-gray-800">{title}</div>
    ) : (
      <div> {children}</div>
    )}
  </td>
);

export { TableDataWithLink, TableData };
