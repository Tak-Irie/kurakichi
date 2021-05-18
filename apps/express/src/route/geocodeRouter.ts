import * as express from 'express';
import { GoogleMapAPIService } from '../services';

export const geocodeRouter = express.Router();

geocodeRouter.get('/postcode', async (req, res) => {
  try {
    // console.log('req.query:', req.query);
    const geocode = await GoogleMapAPIService.getGeoCodeByPostcode(req.query.code as string);
    if (geocode === false) {
      return res.send('郵便番号から所在地を取得できませんでした');
    }
    return res.json(geocode);
  } catch (err) {
    console.error('geocodeErr:', err);
    res.send('エラーが発生しました');
  }
});
