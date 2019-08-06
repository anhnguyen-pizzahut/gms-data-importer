import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export default class OutletOpeningHour {
  @jsonMember
  public client_id: number;

  @jsonMember
  public outlet_id: number;

  @jsonMember
  public day: string;

  @jsonMember
  public opening: string;

  @jsonMember
  public closing: string;

  @jsonMember
  public active: boolean;
}