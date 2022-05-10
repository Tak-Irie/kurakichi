import { Client } from '@googlemaps/google-maps-services-js';

interface GeoCode {
  lat: number;
  lng: number;
}

export class GoogleMapAPI {
  public static async getGeocodeByAddress(
    address: string,
  ): Promise<GeoCode | false> {
    // console.log("address:", address);
    // const modified = GoogleMapAPI.modifyAddress(address);
    // console.log("modified:", modified);
    const mapClient = new Client();
    const response = await mapClient.geocode({
      params: {
        address,
        key: process.env.GOOGLE_GEO_API_KEY || 'trouble',
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

  // private static modifyAddress(address: string): string {
  //   const addressReg =
  //     /(\d{3}-?\d{4})([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]*\s*\d-?\d?-?\d?)\s*[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\d-]*/;
  //   return address.replace(addressReg, "$1$2");
  // }
}
