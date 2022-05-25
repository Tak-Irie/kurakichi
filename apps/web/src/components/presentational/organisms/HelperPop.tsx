import { FC } from 'react';

import { Placement } from '@popperjs/core';
import { IconsQuestion, PopOnIcon } from '../atoms';

type HelperPopProps = {
  text: string;
  popPlace?: Placement;
};

export const HelperPop: FC<HelperPopProps> = ({ text, popPlace }) => (
  <PopOnIcon placement={popPlace} icon={<IconsQuestion />} content={text} />
);
