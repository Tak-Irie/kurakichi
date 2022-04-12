import { VFC } from 'react';
import Link from 'next/link';

import { Message, Org, SecureBase, User, Inquiry } from '../../../graphql';
import {
  AvatarSmall,
  TextSmall,
  TextLabel,
  CardWithPick,
  BadgeInquiryCategory,
  BadgeInquiryStatus,
} from '..';

type TableProps = {
  tableLabel?: string;
  textOfNotExist?: string;
  onClick?: () => void;
};

type TableOrgProps = TableProps & {
  orgs: Org[];
};
type TableOrgMemberProps = TableProps & {
  members: User[];
};

type TableSecureBaseProps = TableProps & {
  secureBases: SecureBase[];
};

type TableMessageProps = TableProps & {
  messages: Message[];
};

type TableInquiryProps = TableProps & {
  inquiries: Inquiry[];
  orgId: string;
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
            linkUrl="/org/[id]/"
            linkAs={`/org/${org.id}`}
          />
        ))
      ) : (
        <TextSmall content={textOfNotExist} />
      )}
    </>
  );
};

export const TableOrgMember: VFC<TableOrgMemberProps> = ({
  members,
  tableLabel = '団体メンバー',
  textOfNotExist = 'メンバーが読み込めません、お手数ですが管理者にお問い合わせ下さい',
}) => {
  return (
    <>
      <TextLabel content={tableLabel} />
      {members[0] ? (
        members.map((member) => (
          <div key={member.id}>
            <CardWithPick
              image={member.avatar === 'UNKNOWN' ? '/asian_man1.jpg' : member.avatar}
              title={member.userName}
              content={member.description}
              imageAlt="ユーザーアバター"
              linkUrl="/user/[id]"
              linkAs={`/user/${member.id}`}
            />
          </div>
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

export const TableMessage: VFC<TableMessageProps> = ({
  messages,
  tableLabel = '新着メッセージ',
  textOfNotExist = '新着メッセージはありません',
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
                <Link href="/user/message/[id]" as={`/user/message/${message.tree.id}`} passHref>
                  <a
                    href="replace"
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

export const TableInquiry: VFC<TableInquiryProps> = ({
  inquiries,
  orgId,
  textOfNotExist = '新着のお問い合わせはありません',
}) => {
  const labelCss = 'py-1 text-xs text-center font-medium text-gray-500';
  const dataCss = 'py-1 flex h-auto items-center justify-center';
  return (
    <div>
      {inquiries[0] ? (
        <div className="bg-gray-50 shadow border-2 border-gray-200 rounded-lg">
          <div className="grid grid-cols-8 divide-y divide-gray-200">
            <div className={labelCss}>送信者</div>
            <div className={`${labelCss} col-span-4`}>内容</div>
            <div className={labelCss}>対応状況</div>
            <div className={labelCss}>カテゴリ</div>
            <div className={labelCss}>受信日</div>
            {inquiries.map((inquiry) => (
              <div className="relative col-span-full grid grid-cols-8" key={inquiry.id}>
                <Link
                  href="/org/myorg/[id]/inquiry/[inqtid]"
                  as={`/org/myorg/${orgId}/inquiry/${inquiry.tree.id}`}
                  passHref
                >
                  <a
                    href="replace"
                    className="h-full w-full absolute z-10 bg-black opacity-0 transition hover:opacity-30 "
                  >
                    link to inquiry
                  </a>
                </Link>
                <div className={`${dataCss} space-x-2`}>
                  <AvatarSmall src={inquiry.sender?.avatar} alt="ユーザーアバター" />
                  <TextSmall content={inquiry.sender?.userName} />
                </div>
                <div className={`${dataCss} col-span-4`}>
                  <div className="px-2 w-full">
                    <TextSmall content={inquiry.content} />
                  </div>
                </div>
                <div className={dataCss}>
                  <div className="px-2 w-full">
                    <BadgeInquiryStatus size="large" status={inquiry.inquiryStatus} />
                  </div>
                </div>
                <div className={dataCss}>
                  <div className="px-2 w-full">
                    <BadgeInquiryCategory size="large" category={inquiry.category} />
                  </div>
                </div>
                <div className={dataCss}>
                  <div className="px-2 w-full">
                    <TextSmall content={inquiry.sentAt} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <TextSmall content={textOfNotExist} />
      )}
    </div>
  );
};
