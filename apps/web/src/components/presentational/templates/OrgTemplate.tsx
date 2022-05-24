import { Tab } from '@headlessui/react';
import type { FC, ReactNode } from 'react';
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
      {' '}
      <Tab.Group>
        <Tab.List>
          {pageTabs.map((tab) => (
            <Tab>{tab}</Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {pageContents.map((content) => (
            <Tab.Panel>{content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  </div>
);
