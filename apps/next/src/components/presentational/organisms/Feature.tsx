import { FC } from 'react';

import { TextH2, TextBase, AnimationBlock } from '@next/ui';

export const Feature: FC = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <TextH2 content="You miss 100% of the shots you don't take" />
        <TextBase content="TEst" />
        <TextBase content="日本語入力" />
      </div>
      <div className="max-w-lg space-y-3 sm:mx-auto lg:max-w-xl">
        <AnimationBlock>something</AnimationBlock>
        <AnimationBlock>Change the world by being yourself.</AnimationBlock>
      </div>
    </div>
  );
};
