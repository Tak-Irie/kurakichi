import { Client } from "@googlemaps/google-maps-services-js";
import { JapaneseAddressRegExp } from "@kurakichi/modules";

interface GeoCode {
  lat: number;
  lng: number;
}

export class GoogleMapAPIService {
  public static async getGeoCodeByAddress(
    address: string
  ): Promise<GeoCode | false> {
    try {
      // console.log("address:", address);
      const modified = GoogleMapAPIService.modifyAddress(address);
      // console.log("modified:", modified);
      const mapClient = new Client();
      const response = await mapClient.geocode({
        params: {
          address: modified,
          key: process.env.GOOGLE_GEO_API_KEY as string,
          region: "jp",
        },
      });
      if (response.status != 200) {
        return false;
      }
      const data = response.data.results[0].geometry.location;
      // console.log('data:', data);
      return { lat: data.lat, lng: data.lng };
    } catch (err) {
      console.error("err:", err);
      return false;
    }
  }

  private static modifyAddress(address: string): string {
    return address.replace(JapaneseAddressRegExp, "$1$2");
  }
}