// import { parse } from 'papaparse';
import { TypedJSON } from 'typedjson';
// import { ParserType } from './types';

import Outlet from '../../models/raw/outlet';

export default class DataParser {
  public static parseCSV(): DataParser {
    // parse; Do some parsinghere
    throw new Error('Unimplemented');
  }

  public static parseJSON_outlets(json: string): Outlet[] {
    const serializer = new TypedJSON(Outlet);
    const data = serializer.parseAsArray(json);
    return <Outlet[]> data;
  }
}
