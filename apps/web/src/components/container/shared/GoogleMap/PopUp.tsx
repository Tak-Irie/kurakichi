import { FC, ReactNode } from 'react';

type PopUpProps = {
  children: ReactNode;
};

export const PopUp: FC<PopUpProps> = ({ children }) => (
  <div className="popup-bubble-anchor">
    <div className="popup-bubble">{children}</div>
  </div>
);
