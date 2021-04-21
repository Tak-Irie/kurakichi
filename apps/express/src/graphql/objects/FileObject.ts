import { objectType } from 'nexus';

export const File = objectType({
  name: 'File',
  description: 'used for avatar and image',
  definition(t) {
    t.implements('Node');
    t.string('path');
    t.string('fileName');
    t.string('mimeType');
  },
});
