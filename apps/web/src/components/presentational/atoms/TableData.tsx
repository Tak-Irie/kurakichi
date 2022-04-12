import { FC, ReactElement } from 'react';
import Link from 'next/link';

type TableBodyProps = {
  link: string;
  title?: string;
  icon?: ReactElement;
};

const TableDataWithLink: FC<TableBodyProps> = ({ icon, link, title }) => {
  return (
    <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-base text-gray-900">
      <div className="flex">
        <Link href={link} passHref>
          <a href="replace" className="group inline-flex items-center space-x-2 truncate text-base">
            <div className="h-6 w-6 text-gray-500">{icon}</div>
            <p className="text-gray-500 truncate group-hover:text-gray-900">{title}</p>
          </a>
        </Link>
      </div>
    </td>
  );
};

const TableData: FC<Omit<TableBodyProps, 'link'>> = ({ title, children }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {title ? <span className="text-gray-800 font-medium">{title}</span> : <div> {children}</div>}
    </td>
  );
};

export { TableDataWithLink, TableData };
