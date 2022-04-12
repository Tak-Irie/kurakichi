import { VFC, useState } from 'react';

import { Inquiry, InquiryStatus } from '../../../graphql';
import {
  AvatarSmall,
  BadgeInquiryCategory,
  TextSmall,
  BadgeInquiryStatus,
  BadgeInquiryStatusChangeable,
} from '..';
import { ReplyInquiryForm, AcceptJoinOrgButton, UpdateInquiryStatusButton } from '../../container';

type InquiryTreeProps = {
  inquiries: Inquiry[];
  orgId: string;
};

export const InquiryTree: VFC<InquiryTreeProps> = ({ inquiries, orgId }) => {
  const [isStatus, setIsStatus] = useState(inquiries[0].inquiryStatus);

  return (
    <div className="space-y-2">
      <div className="flex space-x-1">
        <div className="space-y-1 w-44">
          <BadgeInquiryCategory size="large" category={inquiries[0].category} />
          {inquiries[0].category === 'APPLICATION' ? (
            <span className="flex justify-center">
              <AcceptJoinOrgButton requestUserId={inquiries[0].sender.id} requestedOrgId={orgId} />
            </span>
          ) : null}
        </div>
        <div className="space-y-1 w-44">
          <BadgeInquiryStatusChangeable handleChange={setIsStatus} size="large" status={isStatus} />
          <span className="flex justify-center">
            <UpdateInquiryStatusButton inquiryId={inquiries[0].id} inquiryStatus={isStatus} />
          </span>
        </div>
      </div>
      <div className="mt-10">
        <ul className="divide-y p-2 divide-gray-200 bg-gray-50 shadow border-2 border-gray-200 rounded-lg">
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
      </div>
      <div className="mt-5">
        <ReplyInquiryForm replyTargetId={inquiries[0].id} />
      </div>
    </div>
  );
};
