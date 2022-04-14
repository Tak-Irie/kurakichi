import { FC } from 'react';

type GridTemplateProps = {
  gridConf?: string;
};

export const GridTemplate: FC<GridTemplateProps> = (props) => {
  return (
    <dl
      className={
        props.gridConf || 'grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'
      }
    >
      {props.children}
    </dl>
  );
};
