import { VFC, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { LoadingSpinner, TableInquiry, TextSmall } from '../presentational';
import { Inquiry, InquiryStatus, useGetInquiriesWithStatusLazyQuery } from '../../graphql';

type InquiryInfiniteTableProps = {
  initialInquiries: Inquiry[];
  orgId: string;
  status?: InquiryStatus;
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
  const [getInquiry, { data, loading, error }] = useGetInquiriesWithStatusLazyQuery({
    onCompleted: (_d) => console.log('complete:', _d),
  });

  const [inquiries, setInquiries] = useState<InquiriesInfo>({
    loadedInquiries: initialInquiries,
    pageInfo: { hasMore: true },
  });

  const handleScroll = async () => {
    console.log('inHandle:', inquiries);
    // console.log('inHandlePop:', inquiries.loadedInquiries[limit]);
    if (inquiries.pageInfo.hasMore === false) {
      return;
    }
    const length = inquiries.loadedInquiries.length;
    getInquiry({
      variables: {
        limit,
        orgId,
        status,
        endCursor: inquiries.loadedInquiries[length - 1].id,
      },
    });
    console.log('data:', data);
  };

  useEffect(() => {
    console.log('fire:');
    console.log('inqsB:', inquiries.loadedInquiries);
    if (data?.getInquiriesWithStatus.inquiries) {
      setInquiries((prev) => {
        return {
          loadedInquiries: prev.loadedInquiries.concat(data.getInquiriesWithStatus.inquiries),
          pageInfo: { hasMore: data.getInquiriesWithStatus.pageInfo.hasMore },
        };
      });
    }
    console.log('dataUploaded:', data);
    console.log('inqsA:', inquiries.loadedInquiries);
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={inquiries.loadedInquiries.length}
      next={handleScroll}
      hasMore={inquiries.pageInfo.hasMore}
      height={400}
      endMessage={
        <span className="bg-yellow-100 flex rounded justify-center">
          <TextSmall textColor="yellow" content="未読お問い合わせは以上です" />
        </span>
      }
      loader={<LoadingSpinner />}
    >
      <TableInquiry
        inquiries={inquiries.loadedInquiries}
        orgId={orgId}
        tableLabel="未読お問い合わせ"
      />
    </InfiniteScroll>
  );
};

export default InquiryInfiniteTable;
