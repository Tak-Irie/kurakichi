import { useEffect, useState, VFC } from 'react';

import {
  Inquiry,
  InquiryStatus,
  useGetInquiriesByOrgIdLazyQuery,
  useGetInquiriesWithStatusLazyQuery,
} from '../../../graphql';
import { LoadingSpinner, TableInquiry, TextSmall } from '../../presentational';

type InquiryInfiniteTableProps = {
  initialInquiries: Inquiry[];
  orgId: string;
  limit?: number;
};

type InquiryInfiniteTableWithStatusProps = InquiryInfiniteTableProps & {
  status?: InquiryStatus;
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
}) => {
  const [getInquiry, { data, loading, error }] =
    useGetInquiriesByOrgIdLazyQuery();

  const [inquiries, setInquiries] = useState<InquiriesInfo>({
    loadedInquiries: initialInquiries,
    pageInfo: { hasMore: true },
  });

  const handleScroll = async () => {
    if (inquiries.pageInfo.hasMore === false) {
      return;
    }
    const length = inquiries.loadedInquiries.length;
    getInquiry({
      variables: {
        limit,
        orgId,
        endCursor: inquiries.loadedInquiries[length - 1].id,
      },
    });
  };

  useEffect(() => {
    if (data?.getInquiriesByOrgId.inquiries) {
      setInquiries((prev) => {
        return {
          loadedInquiries: prev.loadedInquiries.concat(
            data.getInquiriesByOrgId.inquiries,
          ),
          pageInfo: { hasMore: data.getInquiriesByOrgId.pageInfo.hasMore },
        };
      });
    }
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={inquiries.loadedInquiries.length}
      next={handleScroll}
      hasMore={inquiries.pageInfo.hasMore}
      height={400}
      endMessage={
        <span className="flex justify-center bg-yellow-100 rounded">
          <TextSmall color="yellow" content="お問い合わせは以上です" />
        </span>
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

export const InquiryInfiniteTableWithStatus: VFC<
  InquiryInfiniteTableWithStatusProps
> = ({ limit = 20, initialInquiries, orgId, status }) => {
  // console.log('statusInTable:', status);
  const [getInquiry, { data, loading, error }] =
    useGetInquiriesWithStatusLazyQuery();

  const [inquiries, setInquiries] = useState<InquiriesInfo>({
    loadedInquiries: initialInquiries,
    pageInfo: { hasMore: true },
  });

  const handleScroll = async () => {
    // console.log('inHandle:', inquiries);
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
    // console.log('data:', data);
  };

  useEffect(() => {
    // console.log('fire:');
    // console.log('inqsB:', inquiries.loadedInquiries);
    if (data?.getInquiriesWithStatus.inquiries) {
      setInquiries((prev) => {
        return {
          loadedInquiries: prev.loadedInquiries.concat(
            data.getInquiriesWithStatus.inquiries,
          ),
          pageInfo: { hasMore: data.getInquiriesWithStatus.pageInfo.hasMore },
        };
      });
    }
    // console.log('dataUploaded:', data);
    // console.log('inqsA:', inquiries.loadedInquiries);
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={inquiries.loadedInquiries.length}
      next={handleScroll}
      hasMore={inquiries.pageInfo.hasMore}
      height={400}
      endMessage={
        <span className="flex justify-center bg-yellow-100 rounded">
          <TextSmall color="yellow" content="未読お問い合わせは以上です" />
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

export default InquiryInfiniteTableWithStatus;
