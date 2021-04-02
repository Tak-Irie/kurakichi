import { FC } from 'react';
import { DownArrowInCircleSVG, DownwardCurveSVG } from '../atoms/SVG';
import { BigText, SmallText, Text } from '../atoms/Text';

import { RegisterUser } from '../../container/RegisterUser';

const Feature2: FC = () => {
  return (
    <div className="relative bg-deep-purple-accent-400">
      <DownwardCurveSVG />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <BigText>this is BigText components</BigText>
          <Text>this is regular size text components</Text>
          <RegisterUser />
          <SmallText>this is small text</SmallText>
          <DownArrowInCircleSVG />
        </div>
      </div>
    </div>
  );
};

export { Feature2 };
