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
            {typeof label === 'string' ? (
              <span className={`flex ${labelCSS}`}>
                {label}
                <span className="flex items-center">
                  {open ? (
                    <IconsUpChevron overwriteCSS={iconCSS} />
                  ) : (
                    <IconsDownChevron overwriteCSS={iconCSS} />
                  )}
                </span>
              </span>
            ) : (
              label
            )}
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel className={contentCSS}>{content}</HeadlessDisclosure.Panel>
        </>
      )}
    </HeadlessDisclosure>
  );
};
