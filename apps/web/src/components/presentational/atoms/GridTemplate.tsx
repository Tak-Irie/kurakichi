import { FC, ReactNode } from 'react';

type GridTemplateProps = {
  children: ReactNode;
  gridConf?: string;
};

export const GridTemplate: FC<GridTemplateProps> = ({ children, gridConf }) => (
  <dl className={gridConf || 'grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-1'}>
    {children}
  </dl>
);
