import { FC, useState } from 'react';
import { InquiryStatusModel } from '../../../lib';

import { Inquiry } from '../../../graphql';

import { AvatarSmall, TextSmall } from '../../presentational/atoms';
import { BadgeInquiryCategory } from '../../presentational/molecules';
import { BadgeInquiryStatusChangeable } from '../../presentational/organisms';
import { AcceptJoinOrgButton } from './AcceptJoinOrgButton';
import { ReplyInquiryForm } from './ReplyInquiryForm';
import { UpdateInquiryStatusButton } from './UpdateInquiryStatusButton';

type InquiryTreeProps = {
  inquiries: Inquiry[];
  orgId: string;
};

// FIXME:fix useState, they dont accept undefined
export const InquiryTree: FC<InquiryTreeProps> = ({ inquiries, orgId }) => {
  const [isStatus, setIsStatus] = useState<InquiryStatusModel>('UNREAD');

  return (
    <div className="space-y-2">
      <div className="flex space-x-1">
        <div className="space-y-1 w-44">
          <BadgeInquiryCategory
            size="large"
            category={inquiries[0].category || 'OTHERS'}
          />
          {inquiries[0].category === 'APPLICATION' ? (
            <span className="flex justify-center">
              <AcceptJoinOrgButton
                requestUserId={inquiries[0].sender?.id || ''}
                requestedOrgId={orgId}
              />
            </span>
          ) : null}
        </div>
        <div className="space-y-1 w-44">
          <BadgeInquiryStatusChangeable
            handleChange={setIsStatus}
            size="large"
            status={isStatus || 'UNREAD'}
          />
          <span className="flex justify-center">
            <UpdateInquiryStatusButton
              inquiryId={inquiries[0].id}
              inquiryStatus={isStatus || 'UNREAD'}
            />
          </span>
        </div>
      </div>
      <div className="mt-10">
        <ul className="p-2 bg-gray-50 rounded-lg border-2 border-gray-200 divide-y divide-gray-200 shadow">
          {inquiries.map((inquiry) => (
            <li key={inquiry.id}>
              <div className="flex mt-2 space-x-3">
                <AvatarSmall
                  src={inquiry.sender?.avatarUrl || ''}
                  alt="ユーザーアバター"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      {inquiry?.sender?.name || ''}
                    </h3>
                    <TextSmall content={inquiry.sentAt || ''} />
                  </div>
                </div>
              </div>
              <div className="ml-1">
                <TextSmall content={inquiry.content || ''} />
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
