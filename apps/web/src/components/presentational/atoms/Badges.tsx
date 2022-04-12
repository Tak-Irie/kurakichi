import { VFC } from 'react';

type BadgesProps = {
  color: 'red' | 'green' | 'yellow' | 'blue' | 'gray';
  content: string;
};

export const Badge: VFC<BadgesProps> = ({ color, content }) => {
  return (
    <span
      className={`inline-flex justify-center items-center w-full px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {content}
    </span>
  );
};

export const BadgeLarge: VFC<BadgesProps> = ({ color, content }) => {
  return (
    <span
      className={`inline-flex justify-center items-center w-full px-3 py-0.5  rounded-full text-sm font-bold bg-${color}-100 text-${color}-800`}
    >
      {content}
    </span>
  );
};
