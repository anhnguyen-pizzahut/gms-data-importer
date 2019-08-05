import axios from 'axios';
import csv2json from 'csvjson-csv2json';

// Data sources
import { S3_BUCKET_URLS } from '../../configs';

import Outlet from '../../models/raw/outlet';

export default class DataParser {
  public static async getAndParseOutlets(): Promise<Outlet[]> {
    const csv = await axios.get(S3_BUCKET_URLS.IMPORT_OUTLETS);
    const results = csv2json(csv.data, { parseNumber: true }).map(outlet => {
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

      for (let attribute in outlet) {
        if (outlet[attribute].length === 0) {
          outlet[attribute] = null;
        }
      }

      delete outlet['id'];
      return outlet;
    });
    return <Outlet[]>results;
  }
}
