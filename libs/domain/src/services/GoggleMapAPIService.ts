import { Client } from '@googlemaps/google-maps-services-js';
import {} from '@kurakichi/node-util';

interface GeoCode {
  lat: number;
  lng: number;
}

export class GoogleMapAPIService {
  public static async getGeoCodeByAddress(address: string): Promise<GeoCode | false> {
    // console.log('address:', address);
    const modified = GoogleMapAPIService.modifyAddress(address);
    // console.log('modified:', modified);
    const mapClient = new Client();
    const response = await mapClient.geocode({
      params: {
        address: modified,
        key: process.env.NX_GOOGLE_GEO_API_KEY,
        region: 'jp',
      },
    });
    if (response.status != 200) {
      return false;
    }
    const data = response.data.results[0].geometry.location;
    // console.log('data:', data);
    return { lat: data.lat, lng: data.lng };
  }
  private static modifyAddress(address: string): string {
    const addressReg = /^[0-9]*([^\w]*[0-9-]*)/;
    return addressReg.exec(address)[1];
  }
}
