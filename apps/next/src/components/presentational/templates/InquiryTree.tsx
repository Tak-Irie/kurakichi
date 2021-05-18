import { Inquiry } from '@next/graphql';
import { VFC } from 'react';
import { AvatarSmall, BadgeInquiryCategory, TextSmall } from '@next/ui';
import { ReplyInquiryForm, AcceptJoinOrgButton } from '@next/container';

type InquiryTreeProps = {
  inquiries: Inquiry[];
  orgId: string;
};

export const InquiryTree: VFC<InquiryTreeProps> = ({ inquiries, orgId }) => {
  return (
    <>
      <div className="max-w-xs max-h-20">
        <BadgeInquiryCategory size="large" category={inquiries[0].category} />
        {inquiries[0].category === 'APPLICATION' ? (
          <div className="mt-2 w-full flex justify-end">
            <AcceptJoinOrgButton requestUserId={inquiries[0].sender.id} requestedOrgId={orgId} />
          </div>
        ) : null}
      </div>
      <ul className="divide-y mt-4 p-2 divide-gray-200 bg-gray-50 shadow border-2 border-gray-200 rounded-lg">
        {inquiries.map((inquiry) => (
          <li key={inquiry.id}>
            <div className="flex space-x-3 mt-2">
              <AvatarSmall src={inquiry.sender.avatar} alt="ユーザーアバター" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{inquiry.sender.userName}</h3>
                  <TextSmall content={inquiry.sentAt} />
                </div>
              </div>
            </div>
            <div className="ml-1">
              <TextSmall content={inquiry.content} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <ReplyInquiryForm replyTargetId={inquiries[0].id} />
      </div>
    </>
  );
};
