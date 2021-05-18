import * as express from 'express';
import { profileUploader } from '../services';

export const uploadRouter = express.Router();

uploadRouter.post('/profile', profileUploader, (req, res) => {
  try {
    // console.log('req.session:', req.session);
    // console.log('req.headers:', req.headers);
    // console.log('req.body', req.body);
    // console.log('req.file', req.files);

    return res.send('success');
  } catch (err) {
    console.log('uploadErr:', err);
    res.send('fail');
  }
});
