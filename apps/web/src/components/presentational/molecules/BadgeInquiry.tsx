import { VFC } from 'react';

import { InquiryCategory, InquiryStatus } from '../../../graphql';
import { Badge, BadgeLarge } from '..';

type BadgeInquiryCategoryProps = {
  category: InquiryCategory;
  size?: 'small' | 'large';
};
type BadgeInquiryStatusProps = {
  status: InquiryStatus;
  size?: 'small' | 'large';
};

export const BadgeInquiryCategory: VFC<BadgeInquiryCategoryProps> = ({ category, size }) => {
  let color: 'red' | 'green' | 'yellow' | 'blue' | 'gray';
  let content: string;

  switch (category) {
    case 'COUNSEL':
      color = 'yellow';
      content = '相談';
      break;
    case 'INQUIRY':
      color = 'red';
      content = 'お問い合わせ';
      break;
    case 'CONTACT':
      color = 'green';
      content = '業務連絡';
      break;
    case 'APPLICATION':
      color = 'blue';
      content = '所属申請';
      break;
    case 'OTHERS':
      color = 'gray';
      content = 'その他';
      break;
    default:
      color = 'gray';
      content = 'その他';
  }

  return size === 'large' ? (
    <BadgeLarge color={color} content={content} />
  ) : (
    <Badge color={color} content={content} />
  );
};
export const BadgeInquiryStatus: VFC<BadgeInquiryStatusProps> = ({ status, size }) => {
  let color: 'red' | 'green' | 'yellow' | 'gray';
  let content: string;

  switch (status) {
    case 'UNREAD':
      color = 'red';
      content = '未読';
      break;
    case 'DONE':
      color = 'gray';
      content = '対応済';
      break;
    case 'WORKING':
      color = 'green';
      content = '対応中';
      break;
    case 'DRAFT':
      color = 'yellow';
      content = '作成中';
      break;
    default:
      color = 'red';
      content = '未読';
  }

  return size === 'large' ? (
    <BadgeLarge color={color} content={content} />
  ) : (
    <Badge color={color} content={content} />
  );
};
