import axios from 'axios';
import csv2json from 'csvjson-csv2json';

// Data sources
import { S3_BUCKET_URLS } from '../../configs';

import { getLatLongFromAddress } from './utils';

import Outlet from '../../models/source/outlet';
import OutletGps from '../../models/source/outlet-gps';
import OutletOpeningHour from '../../models/source/outlet-opening-hour';
import { OPENING_HOUR_MAPPED_ATTRIBUTES } from './constants';

export default class DataParser {
  private static parseOutletsOpeningHours(outlet: Outlet): OutletOpeningHour[] {
    const opening_hours = new Array<OutletOpeningHour>();
    OPENING_HOUR_MAPPED_ATTRIBUTES.forEach(attribute => {
      const opening_hour = <OutletOpeningHour>{
        client_id: outlet.client_id,
        active: true
      };
      opening_hour.opening = outlet[attribute.fields[0]] || null;
      opening_hour.closing = outlet[attribute.fields[1]] || null;
      opening_hour.day = attribute.day;
      opening_hours.push(opening_hour);
    });
    return opening_hours;
  }

  public static async getAndParseOutlets(): Promise<Outlet[]> {
    const csv = await axios.get(S3_BUCKET_URLS.IMPORT_OUTLETS);
    const results = csv2json(csv.data, { parseNumber: true }).map(
      async outlet => {
        outlet.name = JSON.stringify({
          en: outlet.name || '',
          pt: outlet.name || ''
        });
        outlet.description = JSON.stringify({
          en: outlet.description || '',
          pt: outlet.description || ''
        });
        if (outlet.street) {
          outlet.street =
            outlet.street && outlet.street.length > 0
              ? `"${outlet.street}"`
              : null;
        }
        outlet.disposition = `["${outlet.disposition.split('|').join(',')}"]`;
        outlet.min_cart = `{"${outlet.min_cart.split('|').join(',')}"}`;
        outlet.quote_time = `{"${outlet.quote_time.split('|').join(',')}"}`;
        outlet.division = `{"${outlet.division.split('|').join(',')}"}`;
        outlet.address = JSON.stringify({
          en: outlet.address_en,
          pt: outlet.address_pt
        });

        for (let i = 0; i < 5; i++) {
          // Retry if it fails to get lat/lng
          const geolocationResponse = await getLatLongFromAddress(
            outlet.address_en
          );
          if (geolocationResponse) {
            const geolocation: OutletGps = new OutletGps(
              geolocationResponse.lat,
              geolocationResponse.lng
            );
            outlet.lat = geolocation.lat;
            outlet.long = geolocation.lng;
            break;
          }
        }

        for (let attribute in outlet) {
          if (outlet[attribute] && outlet[attribute].length === 0) {
            outlet[attribute] = null;
          }
        }

        outlet.opening_hours = this.parseOutletsOpeningHours(outlet);

        delete outlet['id'];
        return outlet;
      }
    );
    return <Outlet[]>results;
  }
}
