import { Message, Org, SecureBase } from '../../../graphql/generated/graphql';
import { useState, VFC } from 'react';
import { AvatarSmall, TextSmall, TextLabel, CardWithPick } from '@next/ui';
import Link from 'next/link';

type TableProps = {
  tableLabel?: string;
  textOfNotExist?: string;
  onClick?: () => void;
};

type TableNewMessagesProps = TableProps & {
  messages: Message[];
};

type TableOrgProps = TableProps & {
  orgs: Org[];
};
type TableSecureBaseProps = TableProps & {
  secureBases: SecureBase[];
};

export const TableOrg: VFC<TableOrgProps> = ({
  orgs,
  tableLabel = '所属団体',
  textOfNotExist = '団体に所属していません',
}) => {
  return (
    <>
      <TextLabel content={tableLabel} />
      {orgs[0] ? (
        orgs.map((org) => (
          <CardWithPick
            key={org.id}
            image={org.avatar === 'UNKNOWN' ? '/logo_temp.png' : org.avatar}
            title={org.orgName}
            content={org.description}
            imageAlt="団体アバター"
            linkUrl={org.id}
          />
        ))
      ) : (
        <TextSmall content={textOfNotExist} />
      )}
    </>
  );
};

export const TableSecureBase: VFC<TableSecureBaseProps> = ({
  secureBases,
  tableLabel = '所属ベース',
  textOfNotExist = 'ベースに所属していません',
}) => {
  return (
    <>
      <TextLabel content={tableLabel} />
      {secureBases[0] ? (
        secureBases.map((base) => (
          <CardWithPick
            key={base.id}
            image={base.baseOwner.avatar === 'UNKNOWN' ? '/logo_temp.png' : base.baseOwner.avatar}
            title={base.baseOwner.userName}
            content={base.baseOwner.userName}
            imageAlt="ユーザーアバター"
            linkUrl={base.id}
          />
        ))
      ) : (
        <TextSmall content={textOfNotExist} />
      )}
    </>
  );
};

export const TableNewMessages: VFC<TableNewMessagesProps> = ({
  messages,
  textOfNotExist,
  tableLabel,
  onClick,
}) => {
  return (
    <>
      <TextLabel content={tableLabel} />
      {messages[0] ? (
        <div className="bg-gray-50 shadow border-2 border-gray-200 rounded-lg">
          <div className="grid grid-cols-6 divide-y divide-gray-200">
            <div className="col-star-1 pl-4 py-1 text-left text-xs font-medium text-gray-500">
              送信者
            </div>
            <div className="col-auto py-1 text-left text-xs font-medium text-gray-500">内容</div>
            <div className="col-end-7 py-1 px-1 text-left text-xs font-medium text-gray-500">
              受信日
            </div>
            {messages.map((message) => (
              <div className="relative col-span-full grid grid-cols-6" key={message.id}>
                <Link href="/user/message/[id]" as={`/user/message/${message.tree.id}`}>
                  <a
                    href="/user/message/[id]"
                    className="h-full w-full absolute z-10 bg-black opacity-0 transition hover:opacity-30 "
                  >
                    link to message
                  </a>
                </Link>
                <div className="col-start-1 pl-2 py-2 space-x-1 flex items-center">
                  <AvatarSmall src={message.sender?.avatar} alt="ユーザーアバター" />
                  <TextSmall content={message.sender?.userName} />
                </div>
                <div className="col-span-4 mx-1 py-4 whitespace-nowrap overflow-scroll">
                  <TextSmall content={message.content} />
                </div>
                <div className="col-end-7 px-1 whitespace-nowrap py-4">
                  <TextSmall content={message.sentAt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <TextSmall content={textOfNotExist} />
      )}
    </>
  );
};
