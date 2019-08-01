import { parse } from 'papaparse';
import TypedJSON from 'typedjson';

import { MapperType } from './mapper-type';

export default class Mapper {
  static instance: Mapper;
  static mapperType: MapperType;

  private constructor() { } // make constructor private

  public static create(type: MapperType): void {
    if (!Mapper.instance) {
      Mapper.mapperType = type;
      switch (type) {
        case MapperType.CSVMapper:
          Mapper.instance = parse;
          break;
        case MapperType.JSONMapper:
          Mapper.instance = TypedJSON;
          break;
        case MapperType.XMLMapper:
          throw new Error('Unsupported');
        default:
          throw new Error('Mapper was not specified');
      }
    }
  }
}
