import Link from 'next/link';
import { FC } from 'react';

import { Base, Inquiry, Message, Org, User } from '../../../graphql';
import { FAIL_TO_FETCH } from '../../../lib/Constants';
import { AvatarSmall, CardWithPick, TextLabel, TextSmall } from '../atoms';
import { BadgeInquiryCategory, BadgeInquiryStatus } from '../molecules';

type TableProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  tableLabel?: string;
  textOfNotExist?: string;
  // onClick?: () => void;
};

type TableOrgProps = TableProps & {
  orgs: Org[];
};
type TableOrgMemberProps = TableProps & {
  members: User[];
};

type TableSecureBaseProps = TableProps & {
  bases: Base[];
};

type TableMessageProps = TableProps & {
  messages: Message[];
};

type TableInquiryProps = TableProps & {
  inquiries?: Inquiry[];
  orgId: string;
};

export const TableOrg: FC<TableOrgProps> = ({
  orgs,
  tableLabel = '所属団体',
  textOfNotExist = '団体に所属していません',
}) => (
  <div>
    <TextLabel content={tableLabel} />
    {orgs[0] ? (
      orgs.map((org) => (
        <CardWithPick
          key={org.id}
          image={org.avatarUrl || '/logo_temp.png'}
          title={org.name || FAIL_TO_FETCH}
          content={org.description || FAIL_TO_FETCH}
          imageAlt="団体アバター"
          linkUrl="/org/[id]/"
          linkAs={`/org/${org.id}`}
        />
      ))
    ) : (
      <TextSmall content={textOfNotExist} />
    )}
  </div>
);

export const TableOrgMember: FC<TableOrgMemberProps> = ({
  members,
  tableLabel = '団体メンバー',
  textOfNotExist = 'メンバーが読み込めません、お手数ですが管理者にお問い合わせ下さい',
}) => (
  <div>
    <TextLabel content={tableLabel} />
    {members[0] ? (
      members.map((member) => (
        <div key={member.id}>
          <CardWithPick
            image={member.avatarUrl || '/asian_man1.jpg'}
            title={member.name || FAIL_TO_FETCH}
            // content={member.selfIntro || FAIL_TO_FETCH}
            imageAlt="ユーザーアバター"
            linkUrl="/user/[id]"
            linkAs={`/user/${member.id}`}
          />
        </div>
      ))
    ) : (
      <TextSmall content={textOfNotExist} />
    )}
  </div>
);
export const TableBase: FC<TableSecureBaseProps> = ({
  bases,
  tableLabel = '所属ベース',
  textOfNotExist = 'ベースに所属していません',
}) => (
  <div>
    <TextLabel content={tableLabel} />
    {bases[0] ? (
      bases.map((base) => (
        <CardWithPick
          key={base.id}
          image="/logo_temp.png"
          title={FAIL_TO_FETCH}
          content={FAIL_TO_FETCH}
          imageAlt="ユーザーアバター"
          linkUrl={base.id}
        />
      ))
    ) : (
      <TextSmall content={textOfNotExist} />
    )}
  </div>
);

export const TableMessage: FC<TableMessageProps> = ({
  messages,
  tableLabel = '新着メッセージ',
  textOfNotExist = '新着メッセージはありません',
}) => (
  <div>
    <TextLabel content={tableLabel} />
    {messages[0] ? (
      <div className="bg-gray-50 rounded-lg border-2 border-gray-200 shadow">
        <div className="grid grid-cols-6 divide-y divide-gray-200">
          <div className="col-start-1 py-1 pl-4 text-xs font-medium text-left text-gray-500">
            送信者
          </div>
          <div className="col-auto py-1 text-xs font-medium text-left text-gray-500">
            内容
          </div>
          <div className="col-end-7 p-1 text-xs font-medium text-left text-gray-500">
            受信日
          </div>
          {messages.map((message) => (
            <div
              className="grid relative grid-cols-6 col-span-full"
              key={message.id}
            >
              <Link
                href="/user/message/[id]"
                as={`/user/message/${message.id}`}
                passHref
              >
                <a
                  href="replace"
                  className="absolute z-10 w-full h-full bg-black opacity-0 hover:opacity-30 transition "
                >
                  link to message
                </a>
              </Link>
              <div className="flex col-start-1 items-center py-2 pl-2 space-x-1">
                <AvatarSmall
                  src={message.sender?.avatarUrl || ''}
                  alt="ユーザーアバター"
                />
                <TextSmall content={message.sender?.name || FAIL_TO_FETCH} />
              </div>
              <div className="overflow-scroll col-span-4 py-4 mx-1 whitespace-nowrap">
                <TextSmall content={message.content || FAIL_TO_FETCH} />
              </div>
              <div className="col-end-7 py-4 px-1 whitespace-nowrap">
                <TextSmall content={message.sentAt || FAIL_TO_FETCH} />
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

export const TableInquiry: FC<TableInquiryProps> = ({
  inquiries,
  orgId,
  textOfNotExist = '新着のお問い合わせはありません',
}) => {
  const labelCss = 'py-1 text-xs text-center font-medium text-gray-500';
  const dataCss = 'py-1 flex h-auto items-center justify-center';
  return (
    <div>
      {inquiries ? (
        <div className="bg-gray-50 rounded-lg border-2 border-gray-200 shadow">
          <div className="grid grid-cols-8 divide-y divide-gray-200">
            <div className={labelCss}>送信者</div>
            <div className={`${labelCss} col-span-4`}>内容</div>
            <div className={labelCss}>対応状況</div>
            <div className={labelCss}>カテゴリ</div>
            <div className={labelCss}>受信日</div>
            {inquiries.map((inquiry) => (
              <div
                className="grid relative grid-cols-8 col-span-full"
                key={inquiry.id}
              >
                <Link
                  href="/org/myorg/[id]/inquiry/[inqtid]"
                  as={`/org/myorg/${orgId}/inquiry/${inquiry.id}`}
                  passHref
                >
                  <a
                    href="replace"
                    className="absolute z-10 w-full h-full bg-black opacity-0 hover:opacity-30 transition "
                  >
                    link to inquiry
                  </a>
                </Link>
                <div className={`${dataCss} space-x-2`}>
                  <AvatarSmall
                    src={inquiry.sender?.avatarUrl || FAIL_TO_FETCH}
                    alt="ユーザーアバター"
                  />
                  <TextSmall content={inquiry.sender?.name || FAIL_TO_FETCH} />
                </div>
                <div className={`${dataCss} col-span-4`}>
                  <div className="px-2 w-full">
                    <TextSmall content={inquiry.content || FAIL_TO_FETCH} />
                  </div>
                </div>
                <div className={dataCss}>
                  <div className="px-2 w-full">
                    <BadgeInquiryStatus
                      size="large"
                      status={inquiry.inquiryStatus || 'UNREAD'}
                    />
                  </div>
                </div>
                <div className={dataCss}>
                  <div className="px-2 w-full">
                    <BadgeInquiryCategory
                      size="large"
                      category={inquiry.category || 'OTHERS'}
                    />
                  </div>
                </div>
                <div className={dataCss}>
                  <div className="px-2 w-full">
                    <TextSmall content={inquiry.sentAt || FAIL_TO_FETCH} />
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
