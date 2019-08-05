import { parse } from 'papaparse';
import TypedJSON from 'typedjson';

import { MapperType } from './mapper-type';

export default class MapperParser {
  static instance: MapperParser;
  static mapperType: MapperType;

  private constructor() { } // make constructor private

  public static create(type: MapperType): void {
    if (!MapperParser.instance) {
      MapperParser.mapperType = type;
      switch (type) {
        case MapperType.CSVMapper:
            MapperParser.instance = parse;
          break;
        case MapperType.JSONMapper:
            MapperParser.instance = TypedJSON;
          break;
        case MapperType.XMLMapper:
          throw new Error('Unsupported');
        default:
          throw new Error('Mapper was not specified');
      }
    }
  }
}
