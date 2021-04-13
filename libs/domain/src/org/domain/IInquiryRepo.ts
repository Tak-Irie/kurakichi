import { UniqueEntityId } from '../../shared';
import { Inquiry } from './Inquiry';

export interface IInquiryRepo {
  getInquiry(id: UniqueEntityId): Promise<Inquiry | false>;
  getInquiries(id: UniqueEntityId): Promise<Inquiry[] | false>;
  registerInquiry(Inquiry: Inquiry): Promise<Inquiry | false>;
}
