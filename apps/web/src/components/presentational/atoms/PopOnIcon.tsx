/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Placement } from '@popperjs/core';
import { FC, ReactElement, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { reactNewLineToBr } from '../../../lib';

type PopOnIconProps = {
  icon: ReactElement;
  content: string | ReactElement;
  className?: string;
  placement?: Placement;
};

export const PopOnIcon: FC<PopOnIconProps> = ({
  icon,
  content,
  placement = 'top',
  className = 'absolute z-10 text:xs bg-yellow-50  text-yellow-700 p-2 border rounded border-gray-300',
}) => {
  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement,
    },
  );

  const handleEnter = () => {
    setVisibility(true);
  };
  const handleLeave = () => {
    setVisibility(false);
  };
  const handleClick = () => {
    setVisibility(!visible);
  };

  return (
    <div>
      <div
        ref={referenceRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        {icon}
      </div>
      <div
        {...attributes.popper}
        style={styles.popper}
        ref={popperRef}
        className={`${visible ? 'visible' : 'invisible'} ${className}`}
      >
        {typeof content === 'string' ? reactNewLineToBr(content) : content}
      </div>
    </div>
  );
};
