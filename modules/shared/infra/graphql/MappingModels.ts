type FileModel = File;
type UserRoleModel = 'VISITOR' | 'CLIENT' | 'EXPERT';
type InquiryCategoryModel =
  | 'APPLICATION'
  | 'CONTACT'
  | 'COUNSEL'
  | 'INQUIRY'
  | 'OTHERS';
type InquiryStatusModel = 'DONE' | 'DRAFT' | 'UNREAD' | 'WORKING';
type MessageStatusModel = 'SENT' | 'READ' | 'UNREAD' | 'DRAFT';

export {
  FileModel,
  UserRoleModel,
  InquiryCategoryModel,
  InquiryStatusModel,
  MessageStatusModel,
};
