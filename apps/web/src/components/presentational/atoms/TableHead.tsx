import { FC, ReactNode } from 'react';

type TableHeadProps = {
  left?: boolean;
  children?: ReactNode;
};

const TableHead: FC<TableHeadProps> = ({ children, left }) => (
  <th
    className={`${
      left ? 'text-left pl-6' : 'text-center mx-auto'
    } py-3 bg-gray-50 text-base font-medium text-gray-500 tracking-wider`}
  >
    {children}
  </th>
);

export { TableHead };
