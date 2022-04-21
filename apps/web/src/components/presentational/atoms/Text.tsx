import { FC } from 'react';
import { reactNewLineToBr } from '../../../util/reactNewLineToBr';

type TextProps = {
  content: string;
  overwriteCSS?: string;
  label?: string;
  color?: 'gray' | 'green' | 'blue' | 'red' | 'yellow';
};

// TODO:, consider what props should be customizable, color and something.
// size should be controlled by components (also responsive feat)

/**
 *If you wanna use \n, give string in object to content
 *@example ok:content={"hello\nworld"} fail:content="hello\nworld"
 */
export const TextBase: FC<TextProps> = ({
  content,
  overwriteCSS = 'text-base text-gray-700',
}) => {
  if (content.length > 0) {
    const _content = reactNewLineToBr(content);
    return <p className={overwriteCSS}>{_content}</p>;
  }
  return <p className={overwriteCSS}>{content}</p>;
};

export const TextSmall: FC<TextProps> = ({ content, color = 'gray' }) => {
  return (
    <TextBase content={content} overwriteCSS={`text-small text-${color}-700`} />
  );
};

export const Text2xl: FC<TextProps> = ({ content, color = 'gray' }) => {
  return <p className={`text-2xl text-${color}-700`}>{content}</p>;
};

export const TextH1: FC<TextProps> = ({ content, color = 'gray' }) => {
  return <h1 className={`text-4xl font-bold text-${color}-700`}>{content}</h1>;
};
export const TextH2: FC<TextProps> = ({ content, color = 'gray' }) => {
  return <h2 className={`text-3xl font-bold text-${color}-700`}>{content}</h2>;
};
export const TextH3: FC<TextProps> = ({ content, color = 'gray' }) => {
  return <h3 className={`text-2xl font-bold text-${color}-700`}>{content}</h3>;
};

export const TextLabel: FC<Omit<TextProps, 'label'>> = ({
  content,
  color = 'gray',
}) => {
  return (
    <div className="mb-2">
      <label className={`underline font-bold text-base  text-${color}-700`}>
        {content}
      </label>
    </div>
  );
};

export const TextLabeled: FC<TextProps> = ({ content, label }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <TextBase content={content} overwriteCSS="text-sm " />
    </div>
  );
};

export const TextWithDivider: FC<Omit<TextProps, 'label'>> = ({ content }) => {
  return (
    <div className="flex relative justify-center items-center my-4">
      <div className="w-full border-t border-gray-300" />
      <p className="absolute px-2 text-gray-700 bg-white">{content}</p>
    </div>
  );
};
