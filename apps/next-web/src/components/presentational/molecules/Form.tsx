import { FC, SyntheticEvent } from 'react';
import { MiddleButton } from '../atoms/Button';

type FormProps = {
  onClick?: () => void;
  onSubmit?: (e: SyntheticEvent) => void;
};

const Form: FC<FormProps> = (props) => {
  return (
    <div>
      <form
        className="flex flex-col items-center w-1/3 mb-4  md:px-16"
        onSubmit={props.onSubmit}
      >
        {props.children}
      </form>
    </div>
  );
};

export { Form };
