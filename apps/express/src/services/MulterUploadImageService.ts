import multer from 'multer';
import path from 'path';

// FIXME: add validation, minimize to webp(do it at front?)
const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    const url = process.env.NX_S3 || 'apps/express/src/public/uploaded';
    // console.log('destination:', url);
    if (file.fieldname === 'avatar') {
      cb(null, `${url}/avatar`);
    } else cb(null, `${url}/image`);
  },
  filename: (req, file, cb) => {
    // console.log('multer recognize it:', file);
    cb(
      null,
      file.fieldname +
        '_' +
        Date.now() +
        '_' +
        req.session.userId +
        path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

export const profileUploader = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);
