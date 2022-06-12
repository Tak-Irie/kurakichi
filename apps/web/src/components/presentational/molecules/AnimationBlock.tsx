import { FC, ReactNode } from 'react';
import { LightningSVG } from '../atoms/SVG';

type AnimationBlockProps = {
  children?: ReactNode;
};

const AnimationBlock: FC<AnimationBlockProps> = ({ children }) => (
  <div className="flex items-center p-2 rounded border shadow duration-300 hover:scale-105 sm:hover:scale-110">
    <LightningSVG />
    <div className="text-gray-800">{children}</div>
  </div>
);

export { AnimationBlock };
