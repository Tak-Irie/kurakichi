import { FC } from 'react';
import { Base, Message, Org } from '../../../graphql/generated';
import { TextLabel, TextLabeled } from '../atoms';
import { TableBase, TableMessage, TableOrg } from '../organisms';

type UserProfileProps = {
  description: string;
  email: string;
  orgs: Org[];
  messages: Message[];
  bases: Base[];
};

export const UserMyPage: FC<UserProfileProps> = ({
  description,
  orgs,
  messages,
  email,
  bases,
}) => (
  // console.log('messages:', messages);
  <div>
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
        <TextLabeled label="メールアドレス" content={email} />
      </div>
    </div>
    <div className="col-start-3 col-end-10 mt-5">
      <TableMessage messages={messages} />
    </div>
    <div className="col-start-3 col-end-10 mt-5">
      <TableBase bases={bases} />
    </div>
    <div className="col-start-3 col-end-10 mt-5">
      <TableOrg orgs={orgs} />
    </div>
  </div>
);
