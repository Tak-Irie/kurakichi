import { FC, ReactElement, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';

type PopOnIconProps = {
  icon: ReactElement;
  content: string | ReactElement;
  overWriteCSS?: string;
  placement?: Placement;
};

export const PopOnIcon: FC<PopOnIconProps> = ({
  icon,
  content,
  placement = 'top',
  overWriteCSS = 'absolute z-10 text:xs bg-gray-100 border border-gray-300',
}) => {
  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
    placement,
  });

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
        className={`${visible ? 'visible' : 'invisible'}  ${overWriteCSS}`}
      >
        {content}
      </div>
    </div>
  );
};
