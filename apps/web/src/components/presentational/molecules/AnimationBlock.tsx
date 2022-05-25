import { FC, ReactChild } from 'react';
import { LightningSVG } from '../atoms/SVG';

type AnimationBlockProps = {
  children?: ReactChild;
};

const AnimationBlock: FC<AnimationBlockProps> = (props) => (
    <div className="flex items-center p-2 rounded border shadow duration-300 hover:scale-105 sm:hover:scale-110">
      <LightningSVG />
      <span className="text-gray-800">{props.children}</span>
    </div>
  );

export { AnimationBlock };
