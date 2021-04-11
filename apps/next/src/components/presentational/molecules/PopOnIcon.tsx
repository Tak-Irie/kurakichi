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
      <div onMouseEnter={handleEvent} onMouseLeave={handleEvent} onClick={handleEvent}>
        {icon}
      </div>
      <div
        {...attributes.popper}
        ref={setPopperElement}
        className={`${visible ? 'visible' : 'invisible'}`}
      >
        {children}
      </div>
    </div>
  );
};

// export const PopOnIcon2: FC<PopOnIconProps> = () => {
//   return (
//     <div className="relative group bg-red-100">
//       <div>Menu</div>
//       <div className="absolute invisible group-hover:visible bg-green-100">
//         <div>Item1</div>
//         <div>Item2</div>
//         <div>Item3</div>
//       </div>
//     </div>
//   );
// };

// export const PopOnIcon: FC<PopOnIconProps> = () => {
//   const [visible, setVisibility] = useState(false);
//   const [referenceElement, setReferenceElement] = useState(null);
//   const [popperElement, setPopperElement] = useState(null);
//   const [arrowElement, setArrowElement] = useState(null);
//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
//   });

//   const handleClick = (e: SyntheticEvent) => {
//     setVisibility(!visible);
//   };

//   return (
//     <>
//       <button
//         type="button"
//         onMouseEnter={handleClick}
//         onMouseLeave={handleClick}
//         onClick={handleClick}
//       >
//         Reference element
//       </button>

//       <div
//         ref={setPopperElement}
//         className={`${visible ? 'visible' : 'invisible'} bg-black text-white`}
//         style={styles.popper}
//         {...attributes.popper}
//       >
//         Popper element
//         <div ref={setArrowElement} style={styles.arrow} />
//       </div>
//     </>
//   );
// };
