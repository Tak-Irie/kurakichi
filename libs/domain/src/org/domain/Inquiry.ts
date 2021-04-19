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

export type InquiryPrimitive = {
  id: string;
  category: InquiryCategoryUnion;
  status: InquiryStatusUnion;
  content: string;
  sender: string;
  receiver: string;
};

export class Inquiry extends Entity<InquiryProps> {
  private constructor(readonly props: InquiryProps) {
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

  public static restoreFromRepo(props: InquiryPrimitive): Inquiry {
    const { category, content, id, receiver, sender, status } = props;
    return new Inquiry({
      id: UniqueEntityId.restoreFromRepo(id),
      category: InquiryCategory.restoreFromRepo(category),
      content: InquiryContent.restoreFromRepo(content),
      status: InquiryStatus.restoreFromRepo(status),
      receiver: UniqueEntityId.restoreFromRepo(receiver),
      sender: UniqueEntityId.restoreFromRepo(sender),
    });
  }
}
