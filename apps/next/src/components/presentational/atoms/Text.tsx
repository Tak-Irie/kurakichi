import { FC, VFC } from 'react';

type TextProps = {
  content: string;
  label?: string;
};

// TODO:, consider what props should be customizable, color and something.
// size should be controlled by components (also responsive feat)

export const TextSmall: VFC<TextProps> = ({ content }) => {
  return <p className="mt-1 text-gray-900 text-sm">{content}</p>;
};

export const Text: VFC<TextProps> = ({ content }) => {
  return <p className="text-base text-gray-700 md:text-lg">{content}</p>;
};

export const Text2xl: VFC<TextProps> = ({ content }) => {
  return <p className="text-2xl text-gray-700">{content}</p>;
};

//TODO:, plan to change H2Text and create H1Text
export const TextBig: VFC<TextProps> = ({ content }) => {
  return (
    <p className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
      {content}
    </p>
  );
};

export const TextLabel: VFC<TextProps> = ({ content }) => {
  return (
    <div className="mb-2">
      <label className="text-base font-medium text-gray-700">{content}</label>
    </div>
  );
};

export const TextLabeled: VFC<TextProps> = ({ content, label }) => {
  return (
    <>
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <p className="mt-1 text-sm text-gray-900">{content}</p>
    </>
  );
};
