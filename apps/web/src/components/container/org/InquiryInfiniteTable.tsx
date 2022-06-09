import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Inquiry,
  useGetInquiriesByOrgIdLazyQuery,
} from '../../../graphql/generated';

import { LoadingSpinner, TableInquiry, TextSmall } from '../../presentational';

type InquiryInfiniteTableProps = {
  initialInquiries: Inquiry[];
  orgId: string;
  // limit?: number;
};

type InquiriesInfo = {
  loadedInquiries: Inquiry[];
  pageInfo: {
    hasMore: boolean;
  };
};

export const InquiryInfiniteTable: FC<InquiryInfiniteTableProps> = ({
  initialInquiries,
  orgId,
}) => {
  const [getInquiry, { data }] = useGetInquiriesByOrgIdLazyQuery();

  const [inquiries, setInquiries] = useState<InquiriesInfo>({
    loadedInquiries: initialInquiries,
    pageInfo: { hasMore: true },
  });

  const handleScroll = async () => {
    if (inquiries.pageInfo.hasMore === false) {
      return;
    }
    getInquiry({
      variables: {
        orgId,
      },
    });
  };

  useEffect(() => {
    if (
      data?.getInquiriesByOrgId?.__typename === 'InquiryConnection' &&
      data.getInquiriesByOrgId.edges
    ) {
      const fetchedInquiry = data.getInquiriesByOrgId.edges.map(
        (edge) => edge.node,
      );
      setInquiries((prev) => ({
        loadedInquiries: prev.loadedInquiries.concat(fetchedInquiry),
        pageInfo: { hasMore: false },
      }));
    }
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={inquiries.loadedInquiries.length}
      next={handleScroll}
      hasMore={inquiries.pageInfo.hasMore}
      height={400}
      endMessage={
        <div className="flex justify-center bg-yellow-100 rounded">
          <TextSmall color="yellow" content="お問い合わせは以上です" />
        </div>
      }
      loader={<LoadingSpinner />}
    >
      <TableInquiry
        inquiries={inquiries.loadedInquiries}
        orgId={orgId}
        tableLabel="お問い合わせ"
      />
    </InfiniteScroll>
  );
};
