import * as express from 'express';
import path from 'path';
import multer from 'multer';

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    const url = process.env.NX_S3 || 'apps/express/src/public/uploaded';
    console.log('destination:', url);
    if (file.fieldname === 'avatar') cb(null, `${url}/avatar`);
    else cb(null, `${url}/image`);
  },
  filename: (req, file, cb) => {
    console.log('multer recognize it:', file);
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

uploadRouter.post('/avatar', upload.single('avatar'), (req, res) => {
  try {
    // console.log('req.session:', req.session);
    // console.log('req.headers:', req.headers);
    // console.log('req.body', req.body);
    // console.log('req.file', req.file);

    return res.send('success');
  } catch (err) {
    console.log('uploadErr:', err);
    res.send('fail');
  }
});

uploadRouter.post('/image', upload.single('image'), (req, res) => {
  try {
    // console.log('req.session:', req.session);
    // console.log('req.headers:', req.headers);
    // console.log('req.body', req.body);
    // console.log('req.file', req.file);

    return res.send('success');
  } catch (err) {
    console.log('uploadErr:', err);
    res.send('fail');
  }
});
