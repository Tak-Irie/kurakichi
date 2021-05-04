import { UniqueEntityId } from '../../shared';
import { Inquiry } from './Inquiry';
import { InquiryStatus } from './InquiryStatus';

export interface IInquiryRepo {
  getInquiry(inquiryId: UniqueEntityId): Promise<Inquiry | false>;
  getInquiryTreeById(treeId: UniqueEntityId): Promise<Inquiry[] | false>;
  getInquiriesByOrgId(orgId: UniqueEntityId): Promise<Inquiry[] | false>;
  getInquiriesWithStatusByOrgId(
    orgId: UniqueEntityId,
    status: InquiryStatus,
  ): Promise<Inquiry[] | false>;
  registerInquiry(inquiry: Inquiry): Promise<Inquiry>;
}
