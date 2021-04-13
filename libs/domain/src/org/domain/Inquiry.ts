import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';
import { InquiryCategory, InquiryCategoryUnion } from './InquiryCategory';
import { InquiryContent } from './InquiryContent';
import { InquiryStatus, InquiryStatusUnion } from './InquiryStatus';

interface InquiryProps {
  id: UniqueEntityId;
  category: InquiryCategory;
  status: InquiryStatus;
  content: InquiryContent;
  sender: UniqueEntityId;
  receiver: UniqueEntityId;
}

export class Inquiry extends Entity<InquiryProps> {
  constructor(readonly props: InquiryProps) {
    super(props);
  }
  public getId(): string {
    return this.getProps().id.getId();
  }

  public getContent(): string {
    return this.getProps().content.getText();
  }

  public getCategory(): InquiryCategoryUnion {
    return this.getProps().category.getValue();
  }
  public getStatus(): InquiryStatusUnion {
    return this.getProps().status.getValue();
  }
  public getSender(): string {
    return this.getProps().sender.getId();
  }
  public getReceiver(): string {
    return this.getProps().sender.getId();
  }

  public static create(props: InquiryProps): Result<Inquiry> {
    const inquiry = new Inquiry({
      ...props,
    });
    // Inquiry.addDomainEvent(new _EntityCreated(Inquiry));
    return Result.success<Inquiry>(inquiry);
  }
}
