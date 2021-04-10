import { FC } from 'react';

type TextProps = {
  text?: string;
};

// TODO:, consider what props should be customizable, color and something.
// size should be controlled by components (also responsive feat)

const SmallText: FC<TextProps> = (props) => {
  return <p className="mt-1 text-gray-900 text-sm">{props.children}</p>;
};

const Text: FC<TextProps> = (props) => {
  return <p className="text-base text-gray-700 md:text-lg">{props.children}</p>;
};

//TODO:, plan to change H2Text and create H1Text
const BigText: FC = (props) => {
  return (
    <p className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
      {props.children}
    </p>
  );
};

export { Text, BigText, SmallText };
