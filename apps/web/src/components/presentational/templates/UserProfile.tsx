import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Org, useGetUserMyInfoQuery } from '../../../graphql';
import { SendMessage } from '../../container/user/SendMessage';

import {
  ButtonWithIcon,
  CardWithPick,
  IconsCaution,
  IconsMail,
  PopOnIcon,
  Text2xl,
  TextLabel,
  TextLabeled,
  TextSmall,
} from '../atoms';
import { ProfileHeader } from '../organisms';

type UserProfileProps = {
  userName: string;
  image: string;
  avatar: string;
  description: string;
  orgs: Org[];
};

export const UserProfile: FC<UserProfileProps> = ({
  avatar,
  description,
  image,
  orgs,
  userName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });
  const router = useRouter();
  const userId = router.query.id as string;

  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        <ProfileHeader
          avatarSrc={avatar}
          imageSrc={image}
          buttons={
            data?.getUserByCookie.__typename === 'User' ? (
              <div>
                <div>
                  <ButtonWithIcon
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    label="メッセージを送る"
                    icon={<IconsMail />}
                  />
                </div>
                <div className="absolute mt-12 w-full">
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
              </div>
            ) : (
              <div>
                <PopOnIcon
                  icon={<IconsCaution />}
                  content="ログインが必要です"
                />
                <ButtonWithIcon
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  label="メッセージを送る"
                  disabled
                  icon={<IconsMail />}
                />
              </div>
            )
          }
        />
      </div>
      <div className="col-start-3">
        <Text2xl content={userName} />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="プロフィール" />
        <div className="mt-2 space-y-1">
          <TextLabeled
            label="自己紹介"
            content={
              description === 'UNKNOWN'
                ? '自己紹介文が記入されていません'
                : description
            }
          />
        </div>
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="所属団体" />
        {orgs[0] ? (
          orgs.map((org) => (
            <CardWithPick
              key={org.id}
              image={org.avatarUrl || '/logo_temp.png'}
              title={org.name || ''}
              content={org.description || ''}
              imageAlt="団体アバター"
              linkUrl={`/org/${org.id}`}
            />
          ))
        ) : (
          <TextSmall content="所属団体はありません" />
        )}
      </div>
    </div>
  );
};
