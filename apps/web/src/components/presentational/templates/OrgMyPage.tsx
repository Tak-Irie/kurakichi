import { FC } from 'react';

import { GridTemplate, GridItem, TextLabel, TableOrgMember, TableInquiry } from '..';
import { InquiryStatus, Org } from '../../../graphql/generated/graphql';
import { InquiryInfiniteTableWithStatus } from '../../container';
import { TextSmall } from '../atoms';

type OrgMyPageProps = {
  org: Org;
};

export const OrgMyPage: FC<OrgMyPageProps> = (props) => {
  const { id, email, phoneNumber, location, homePage, description, members, inquiries } = props.org;
  // console.log('inquiries on orgMy:', inquiries);
  const unreadInq = inquiries.filter((inq) => inq.inquiryStatus === 'UNREAD');
  // const descById = unreadInq.reverse();
  // const descById = [...inquiries].reverse();

  return (
    <>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="未読お問い合わせ" />
        {inquiries[0] ? (
          <InquiryInfiniteTableWithStatus
            orgId={id}
            limit={20}
            status={InquiryStatus['Unread']}
            initialInquiries={unreadInq}
          />
        ) : (
          <TextSmall content="未読お問い合わせはありません" />
        )}
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="プロフィール" />
        <GridTemplate>
          <GridItem label="メールアドレス" content={email} />
          <GridItem label="電話番号" content={phoneNumber} />
          <GridItem label="所在地" content={location} />
          <GridItem
            label="ホームページ"
            content={homePage === 'UNKNOWN' ? 'ホームページはありません' : homePage}
          />
          <GridItem
            label="私達について"
            content={description === 'UNKNOWN' ? '団体の概要を記入して下さい' : description}
            colSpan="col-span-2"
          />
        </GridTemplate>
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableOrgMember members={members} />
      </div>
    </>
  );
};
