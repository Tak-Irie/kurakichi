export type DropZoneFile = string | (File & { preview: string })[];
export type UploadFiles = {
  image: DropZoneFile;
  avatar: DropZoneFile;
};
