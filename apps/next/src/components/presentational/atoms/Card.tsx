import { FC, ReactElement } from 'react';

type CardProps = {
  image?: string;
  title: string;
  content: string;
  link?: ReactElement;
};

export const Card: FC<CardProps> = (props) => {
  const { image, title, content, link } = props;
  return (
    <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl max-w-lg">
      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
      <div className="relative p-5 bg-white rounded-sm">
        <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
          <div className="flex items-center justify-center w-10 h-10 mb-6 mr-2 rounded-full bg-indigo-50">
            {image || null}
          </div>
          <h6 className="font-semibold leading-5">{title}</h6>
        </div>
        <p className="mb-2 text-sm text-gray-900">{content}</p>
        <div className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
          {link}
        </div>
      </div>
    </div>
  );
};
