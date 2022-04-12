import { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import {
  ButtonWithIcon,
  ProfileHeader,
  IconsMail,
  IconsCaution,
  PopOnIcon,
  TextLabeled,
  Text2xl,
  TextLabel,
  CardWithPick,
  TextSmall,
} from '..';
import { SendMessage } from '../../container';

import { Org } from '../../../graphql/generated/graphql';

type UserProfileProps = {
  userId: string;
  userName: string;
  image: string;
  avatar: string;
  description: string;
  orgs: Org[];
  loggedIn: boolean;
};

export const UserProfile: FC<UserProfileProps> = (props) => {
  const { avatar, description, image, orgs, userId, userName, loggedIn } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        <ProfileHeader
          avatarSrc={avatar}
          imageSrc={image}
          buttons={
            loggedIn ? (
              <>
                <div>
                  <ButtonWithIcon
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    label="メッセージを送る"
                    icon={<IconsMail />}
                  />
                </div>
                <div className="mt-12 absolute w-full">
                  <Transition
                    show={isOpen}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute -ml-36">
                      <SendMessage receiverId={userId} />
                    </div>
                  </Transition>
                </div>
              </>
            ) : (
              <>
                <PopOnIcon overWriteCSS="" icon={<IconsCaution />} content="ログインが必要です" />
                <ButtonWithIcon
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  label="メッセージを送る"
                  disabled
                  icon={<IconsMail />}
                ></ButtonWithIcon>
              </>
            )
          }
        ></ProfileHeader>
      </div>
      <div className="col-start-3">
        <Text2xl content={userName} />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="プロフィール" />
        <div className="space-y-1 mt-2">
          <TextLabeled
            label="自己紹介"
            content={description === 'UNKNOWN' ? '自己紹介文が記入されていません' : description}
          />
        </div>
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content={'所属団体'} />
        {orgs[0] ? (
          orgs.map((org) => {
            return (
              <CardWithPick
                key={org.id}
                image={org.avatar === 'UNKNOWN' ? '/logo_temp.png' : org.avatar}
                title={org.orgName}
                content={org.description}
                imageAlt="団体アバター"
                linkUrl={org.id}
              />
            );
          })
        ) : (
          <TextSmall content="所属団体はありません" />
        )}
      </div>
    </div>
  );
};
