import { ReactNode, VFC } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import { IconsDownChevron, IconsUpChevron } from '@next/ui';

type DisclosureProps = {
  label: string | ReactNode;
  content: string | ReactNode;
  labelCSS?: string;
  contentCSS?: string;
  iconCSS?: string;
};

export const Disclosure: VFC<DisclosureProps> = ({
  label,
  content,
  contentCSS = 'text-gray-700',
  iconCSS,
  labelCSS,
}) => {
  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <>
          <HeadlessDisclosure.Button>
            <span className={`flex ${labelCSS}`}>
              {label}
              {open ? (
                <IconsUpChevron overwriteCSS={iconCSS} />
              ) : (
                <IconsDownChevron overwriteCSS={iconCSS} />
              )}
            </span>
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel className={contentCSS}>{content}</HeadlessDisclosure.Panel>
        </>
      )}
    </HeadlessDisclosure>
  );
};
