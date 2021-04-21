import { FC, SyntheticEvent } from 'react';

type FormProps = {
  onSubmit?: (e: SyntheticEvent) => void;
  overWriteCSS?: string;
};

const Form: FC<FormProps> = ({
  onSubmit,
  overWriteCSS = 'flex flex-col space-y-1 items-center w-full mb-4 md:px-16 border-4 rounded-md border-gray-400 bg-gray-200',
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
