import { ApolloContext } from '../../types';
import { Resolvers } from '../generated/generatedTypes';

export const UploadResolver: Resolvers<ApolloContext> = {
  Mutation: {
    uploadFile: async (parent, { file }) => {
      console.log('catch:');
      console.log('file:', file);
      // const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      // const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      // const out = createWriteStream('local-file-output.txt');
      // stream.pipe(out);
      // finished(out, (err) => {
      //   if (err) {
      //     console.error('Stream failed.', err);
      //   } else {
      //     console.log('Stream is done reading.');
      //   }
      // });

      return { filename: 'a', mimetype: 'b', encoding: 'c' };
    },
  },
};
