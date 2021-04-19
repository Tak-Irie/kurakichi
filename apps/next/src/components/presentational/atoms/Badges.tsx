import { FC } from 'react';

type BadgesProps = {
  color: 'red' | 'green' | 'yellow' | 'blue' | 'gray';
};

export const Badge: FC<BadgesProps> = (props) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${props.color}-100 text-${props.color}-800`}
    >
      {props.children}
    </span>
  );
};
export const BadgeLarge: FC<BadgesProps> = (props) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-${props.color}-100 text-${props.color}-800`}
    >
      {props.children}
    </span>
  );
};
