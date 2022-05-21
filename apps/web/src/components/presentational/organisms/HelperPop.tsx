import { FC } from 'react';

import { Placement } from '@popperjs/core';
import { IconsQuestion } from '../atoms';
import { PopOnIcon } from '../molecules';

type HelperPopProps = {
  text: string;
  popPlace?: Placement;
};

export const HelperPop: FC<HelperPopProps> = ({ text, popPlace }) => {
  return (
    <PopOnIcon placement={popPlace} icon={<IconsQuestion />} content={text} />
  );
};
