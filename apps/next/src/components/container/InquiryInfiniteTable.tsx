import { VFC, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { TableInquiry } from '../presentational';
import { Inquiry, InquiryStatus, useGetInquiriesWithStatusLazyQuery } from '../../graphql';

type InquiryInfiniteTableProps = {
  initialInquiries: Inquiry[];
  orgId: string;
  status: InquiryStatus;
  limit?: number;
};

type InquiriesInfo = {
  loadedInquiries: Inquiry[];
  pageInfo: {
    hasMore: boolean;
  };
};

export const InquiryInfiniteTable: VFC<InquiryInfiniteTableProps> = ({
  limit = 20,
  initialInquiries,
  orgId,
  status,
}) => {
  // console.log('statusInTable:', status);
  const [getInquiry, { data, loading, error }] = useGetInquiriesWithStatusLazyQuery();

  const [inquiries, setInquiries] = useState<InquiriesInfo>({
    loadedInquiries: initialInquiries,
    pageInfo: { hasMore: true },
  });

  const handleScroll = async () => {
    // console.log('inHandle:', inquiries.loadedInquiries);
    // console.log('inHandlePop:', inquiries.loadedInquiries[limit]);
    getInquiry({
      variables: {
        limit,
        orgId,
        status,
        endCursor: inquiries.loadedInquiries[limit].id,
      },
    });
  };

  useEffect(() => {
    if (data?.getInquiriesWithStatus.inquiries) {
      setInquiries((prev) => {
        return {
          loadedInquiries: prev.loadedInquiries.concat(data.getInquiriesWithStatus.inquiries),
          pageInfo: prev.pageInfo,
        };
      });
    }
    console.log('dataUploaded:', data);
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={inquiries.loadedInquiries.length}
      next={handleScroll}
      hasMore={inquiries.pageInfo.hasMore}
      height={400}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      loader={<h4>Loading...</h4>}
    >
      <TableInquiry inquiries={inquiries.loadedInquiries} orgId={orgId} />
    </InfiniteScroll>
  );
};

export default InquiryInfiniteTable;
