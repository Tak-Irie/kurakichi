import type { FC, ReactNode, SyntheticEvent } from 'react';

type FormProps = {
  onSubmit?: (e: SyntheticEvent) => void;
  overWriteCSS?: string;
  children: ReactNode;
};

const Form: FC<FormProps> = ({
  onSubmit,
  overWriteCSS = 'flex flex-col space-y-1 items-center px-5 border-2 rounded-md border-gray-400 bg-white',
  children,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit} className={overWriteCSS}>
        {children}
      </form>
    </div>
  );
};

export { Form };
