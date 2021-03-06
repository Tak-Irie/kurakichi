import { FC } from 'react';
import { LightningSVG } from '../atoms/SVG';

const AnimationBlock: FC = (props) => {
  return (
    <div className="flex items-center p-2 duration-300 transform border rounded shadow hover:scale-105 sm:hover:scale-110">
      <LightningSVG />
      <span className="text-gray-800">{props.children}</span>
    </div>
  );
};

export { AnimationBlock };
