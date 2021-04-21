import { extendType, nonNull, stringArg } from 'nexus';

import { getUserIdByCookie } from '../../util/getUserIdByCookie';

export const FileMutation = extendType({
  type: 'File',
  definition(t) {
    t.field('singleUpload', {
      type: 'MessagePayload',
      args: {
        textInput: nonNull('File'),
      },
      resolve: async (_, args, context) => {
        return {};
      },
    });
  },
});
