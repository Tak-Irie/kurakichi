import { FC, SyntheticEvent } from 'react';

type FormProps = {
  onSubmit?: (e: SyntheticEvent) => void;
};

const Form: FC<FormProps> = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit} className="flex flex-col items-center w-1/3 mb-4  md:px-16">
        {props.children}
      </form>
    </div>
  );
};

export { Form };
