import { FC } from 'react';

import { Inquiry, Org as GqlOrg, User } from '../../../graphql';
import { FAIL_TO_FETCH } from '../../../lib/Constants';
// import { InquiryInfiniteTableWithStatus } from '../../container';
import { GridItem, GridTemplate, TextLabel, TextSmall } from '../atoms';
import { TableInquiry, TableOrgMember } from '../organisms';

type OrgMyPageProps = {
  org: GqlOrg;
};

export const OrgMyPage: FC<OrgMyPageProps> = ({ org }) => {
  const {
    id,
    email,
    phoneNumber,
    address,
    homePage,
    description,
    members,
    inquiries,
  } = org;

  let unreadInq: Inquiry[] = [];
  if (inquiries?.edges) {
    const givenInquiries = inquiries.edges.map((edge) => edge.node);
    unreadInq = givenInquiries.filter((inq) => inq.inquiryStatus === 'UNREAD');
  }

  let givenMembers: User[] = [];
  if (members?.edges) {
    givenMembers = members.edges.map((edge) => edge.node);
  }
  // const descById = unreadInq.reverse();
  // const descById = [...inquiries].reverse();
  return (
    <>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="未読お問い合わせ" />
        {unreadInq[0] ? (
          <TableInquiry orgId={id} inquiries={unreadInq} />
        ) : (
          <TextSmall content="未読お問い合わせはありません" />
        )}
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="プロフィール" />
        <GridTemplate>
          <GridItem label="メールアドレス" content={email || FAIL_TO_FETCH} />
          <GridItem label="電話番号" content={phoneNumber || FAIL_TO_FETCH} />
          <GridItem
            label="所在地"
            content={address?.address || FAIL_TO_FETCH}
          />
          <GridItem label="ホームページ" content={homePage || FAIL_TO_FETCH} />
          <GridItem
            label="私達について"
            content={description || '団体の概要を記入して下さい'}
            colSpan="col-span-2"
          />
        </GridTemplate>
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableOrgMember members={givenMembers} />
      </div>
    </>
  );
};
