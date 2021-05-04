import { Inquiry } from '@next/graphql';
import { VFC } from 'react';
import { AvatarSmall, BadgeInquiry, TextSmall } from '@next/ui';
import { ReplyInquiryForm } from '@next/container';

type InquiryTreeProps = {
  inquiries: Inquiry[];
};

export const InquiryTree: VFC<InquiryTreeProps> = ({ inquiries }) => {
  return (
    <>
      <BadgeInquiry size="large" category={inquiries[0].category} />
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
