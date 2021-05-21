import { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import {
  GridTemplate,
  GridItem,
  TextLabel,
  TableOrgMember,
  TableInquiry,
} from '../../presentational';
import { InquiryStatus, Org } from '../../../graphql/generated/graphql';
import { InquiryInfiniteTable } from '../../container';

type OrgMyPageProps = {
  org: Org;
};

export const OrgMyPage: FC<OrgMyPageProps> = (props) => {
  const { id, email, phoneNumber, location, homePage, description, members, inquiries } = props.org;
  // console.log('inquiries on orgMy:', inquiries);
  return (
    <>
      <div className="col-start-3 col-end-10 mt-5">
        <label>this is inf</label>
        <InquiryInfiniteTable
          orgId={id}
          limit={20}
          status={InquiryStatus['Unread']}
          initialInquiries={inquiries}
        />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <label>this is normal</label>
        <TableInquiry orgId={id} inquiries={inquiries} />
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
