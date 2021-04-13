import { FC, ReactElement, SyntheticEvent, useState } from 'react';
import { usePopper } from 'react-popper';

type PopOnIconProps = {
  icon: ReactElement;
};

export const PopOnIcon: FC<PopOnIconProps> = ({ icon, children }) => {
  const [visible, setVisibility] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { attributes } = usePopper(referenceElement, popperElement);

  const handleEvent = (e: SyntheticEvent) => {
    setVisibility(!visible);
  };
  return (
    <div>
      <div onMouseEnter={handleEvent} onClick={handleEvent}>
        {icon}
      </div>
      <div
        {...attributes.popper}
        ref={setPopperElement}
        className={`${visible ? 'visible' : 'invisible'} absolute`}
      >
        {children}
      </div>
    </div>
  );
};
