import { FC } from 'react';

type ButtonProps = {
  onClick?: () => void;
  type: 'button' | 'submit';
};

const SmallButton: FC<ButtonProps> = (props) => {
  return (
    <button
      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const MiddleButton: FC<ButtonProps> = (props) => {
  return (
    <button
      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export { SmallButton, MiddleButton };
