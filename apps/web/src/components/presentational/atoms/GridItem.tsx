import type { FC } from 'react';

type GridItemProps = {
  label: string;
  content: string;
  colSpan?: string;
};

export const GridItem: FC<GridItemProps> = ({
  label,
  content,
  colSpan = 'sm:col-span-1',
}) => {
  return (
    <div className={colSpan}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{content}</dd>
    </div>
  );
};
