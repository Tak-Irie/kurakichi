import { FC } from 'react';

type TableHeadProps = {
  left?: boolean;
};

const TableHead: FC<TableHeadProps> = (props) => {
  return (
    <th
      className={`${
        props.left ? 'text-left pl-6' : 'text-center mx-auto'
      } py-3 bg-gray-50 text-base font-medium text-gray-500 tracking-wider`}
    >
      {props.children}
    </th>
  );
};

export { TableHead };
