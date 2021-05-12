import { VFC } from 'react';
import { reactNewLineToBr } from '../../../util/reactNewLineToBr';

type TextProps = {
  content: string;
  label?: string;
  textColor?: string;
};

// TODO:, consider what props should be customizable, color and something.
// size should be controlled by components (also responsive feat)

export const TextSmall: VFC<TextProps> = ({ content, textColor = 'text-grey-900' }) => {
  if (content) {
    const _content = reactNewLineToBr(content);
    return <p className={`mt-1 inline-flex items-center text-sm ${textColor}`}>{_content}</p>;
  }
  return <p className={`mt-1 inline-flex items-center text-sm ${textColor}`}>{content}</p>;
};

export const Text: VFC<TextProps> = ({ content, textColor }) => {
  if (content) {
    const _content = reactNewLineToBr(content);
    return <p className="text-base text-gray-700 md:text-lg">{_content}</p>;
  }
  return <p className="text-base text-gray-700 md:text-lg">{content}</p>;
};

export const Text2xl: VFC<TextProps> = ({ content, textColor }) => {
  return <p className="text-2xl text-gray-700">{content}</p>;
};

export const TextH2: VFC<TextProps> = ({ content, textColor }) => {
  return <h2 className="max-w-lg text-3xl font-bold text-gray-700 md:mx-auto">{content}</h2>;
};
export const TextH3: VFC<TextProps> = ({ content, textColor }) => {
  return <h3 className="max-w-lg text-2xl font-bold text-gray-700 md:mx-auto">{content}</h3>;
};

export const TextLabel: VFC<Omit<TextProps, 'label'>> = ({ content, textColor }) => {
  return (
    <div className="mb-2">
      <label className="underline font-bold text-base  text-gray-700">{content}</label>
    </div>
  );
};

export const TextLabeled: VFC<TextProps> = ({ content, label, textColor }) => {
  return (
    <>
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <p className="mt-1 text-sm text-gray-900">{content}</p>
    </>
  );
};

export const TextWithDivider: VFC<Omit<TextProps, 'label'>> = ({ content, textColor }) => {
  return (
    <div className="relative my-4 flex justify-center items-center">
      <div className="border-t border-gray-300 w-full" />
      <p className="absolute px-2 bg-white text-gray-700">{content}</p>
    </div>
  );
};
