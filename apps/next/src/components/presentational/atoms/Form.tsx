import { FC, SyntheticEvent } from 'react';

type FormProps = {
  onSubmit?: (e: SyntheticEvent) => void;
};

const Form: FC<FormProps> = (props) => {
  return (
    <div>
      <form
        onSubmit={props.onSubmit}
        className="flex flex-col space-y-1 items-center w-full mb-4 md:px-16 border-4 rounded-md border-gray-400 bg-gray-200"
      >
        {props.children}
      </form>
    </div>
  );
};

export { Form };
