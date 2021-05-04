import { InquiryCategory } from '@next/graphql';
import { VFC } from 'react';
import { Badge, BadgeLarge } from '@next/ui';

type BadgeInquiryProps = {
  category: InquiryCategory;
  size?: 'small' | 'large';
};

export const BadgeInquiry: VFC<BadgeInquiryProps> = ({ category, size }) => {
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
