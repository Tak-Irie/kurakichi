import { FC } from 'react';

import { Message, Org, SecureBase } from '@next/graphql';
import { TextLabeled, TextLabel, TableMessage, TableOrg, TableSecureBase } from '@next/ui';

type UserProfileProps = {
  description: string;
  email: string;
  orgs: Org[];
  messages: Message[];
  secureBases: SecureBase[];
};

export const UserMyPage: FC<UserProfileProps> = ({
  description,
  orgs,
  messages,
  email,
  secureBases,
}) => {
  // console.log('messages:', messages);
  return (
    <>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="プロフィール" />
        <div className="space-y-1 mt-2">
          <TextLabeled
            label="自己紹介"
            content={description === 'UNKNOWN' ? '自己紹介文が記入されていません' : description}
          />
          <TextLabeled label="メールアドレス" content={email} />
        </div>
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableMessage messages={messages} />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableSecureBase secureBases={secureBases} />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableOrg orgs={orgs} />
      </div>
    </>
  );
};
