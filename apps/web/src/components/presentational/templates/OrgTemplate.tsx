import { Tab } from '@headlessui/react';
import type { FC, ReactNode } from 'react';
import { fixClassNameForTailwind } from '../../../lib';
import { Text2xl } from '../atoms';
import { ProfileHeader, ProfileHeaderSetting } from '../organisms';

type OrgTemplateProps = {
  avatar: string;
  image: string;
  orgName: string;
  pageTabs: string[];
  pageContents: ReactNode[];
  headerButtons?: ReactNode;
  settingHeader?: boolean;
};

export const OrgTemplate: FC<OrgTemplateProps> = ({
  headerButtons,
  pageTabs,
  pageContents,
  avatar,
  image,
  settingHeader = false,
  orgName,
}) => (
  <div className="grid grid-cols-12 pb-10">
    <div className="col-span-full">
      {settingHeader ? (
        <ProfileHeaderSetting
          avatarSrc={avatar}
          imageSrc={image}
          buttons={headerButtons}
        />
      ) : (
        <ProfileHeader
          avatarSrc={avatar}
          imageSrc={image}
          buttons={headerButtons}
        />
      )}
    </div>
    <div className="col-start-3 mt-5 font-bold underline">
      <Text2xl content={orgName} />
    </div>
    <div className="col-start-3 col-end-11 mt-2">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {pageTabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }: { selected: boolean }) =>
                fixClassNameForTailwind(
                  'w-full rounded-lg py-2.5 text-lg font-medium leading-5 text-gray-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-red-300 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-white',
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="p-8 my-4 bg-white shadow">
          {pageContents.map((content) => (
            <Tab.Panel>{content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  </div>
);
