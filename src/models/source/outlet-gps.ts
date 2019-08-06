import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export default class OutletGps {
  @jsonMember
  public lat?: number;
  @jsonMember
  public lng?: number;

  constructor(lat?: number, lng?: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
