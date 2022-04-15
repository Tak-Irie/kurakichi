import { Result } from '../../shared/core';
import { Entity } from '../../shared/domain';
import { Time } from '../../shared/domain/Time';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
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
  sentAt: Time;
  treeId: UniqueEntityId;
  orgId: UniqueEntityId;
}

export type InquiryPrimitive = {
  id: string;
  category: InquiryCategoryUnion;
  status: InquiryStatusUnion;
  content: string;
  sender: string;
  receiver: string;
  sentAt: string;
  treeId: string;
  orgId: string;
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
    return this.getProps().receiver.getId();
  }
  public getReceivedOrg(): string {
    return this.getProps().orgId.getId();
  }

  public static create(
    props: Omit<InquiryProps, 'id' | 'sentAt' | 'treeId'>,
  ): Result<Inquiry> {
    const inquiry = new Inquiry({
      ...props,
      id: UniqueEntityId.createULID(),
      sentAt: Time.create().getValue(),
      treeId: UniqueEntityId.createULID(),
    });
    // Inquiry.addDomainEvent(new _EntityCreated(Inquiry));
    return Result.success<Inquiry>(inquiry);
  }

  public static createReply(
    replyTarget: Inquiry,
    replyContent: InquiryContent,
    sender: UniqueEntityId,
  ): Result<Inquiry> {
    const {
      receiver,
      sender: _sender,
      treeId,
      category,
      orgId,
    } = replyTarget.getProps();
    const inquiry = new Inquiry({
      id: UniqueEntityId.createULID(),
      category,
      content: replyContent,
      receiver: _sender,
      sender: sender,
      status: InquiryStatus.create({ status: 'UNREAD' }).getValue(),
      sentAt: Time.create().getValue(),
      orgId,
      treeId,
    });
    // Inquiry.addDomainEvent(new _EntityCreated(Inquiry));
    return Result.success<Inquiry>(inquiry);
  }

  public static restoreFromRepo(props: InquiryPrimitive): Inquiry {
    const {
      category,
      content,
      id,
      receiver,
      sender,
      status,
      sentAt,
      treeId,
      orgId,
    } = props;
    return new Inquiry({
      id: UniqueEntityId.restoreFromRepo({ id }),
      category: InquiryCategory.restoreFromRepo(category),
      content: InquiryContent.restoreFromRepo(content),
      status: InquiryStatus.restoreFromRepo(status),
      receiver: UniqueEntityId.restoreFromRepo({ id: receiver }),
      sender: UniqueEntityId.restoreFromRepo({ id: sender }),
      sentAt: Time.restoreFromRepo(sentAt),
      treeId: UniqueEntityId.restoreFromRepo({ id: treeId }),
      orgId: UniqueEntityId.restoreFromRepo({ id: orgId }),
    });
  }
}
