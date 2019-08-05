import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export default class Outlet {
  @jsonMember
  public zip: string;

  @jsonMember
  public client_id: number;

  @jsonMember
  public code: string;

  @jsonMember
  public name: string;

  @jsonMember
  public description: string;

  @jsonMember
  public address: string;

  @jsonMember
  public street: string;

  @jsonMember
  public lat: number;

  @jsonMember
  public long: number;

  @jsonMember
  public timezone: string;

  @jsonMember
  public phone: string;

  @jsonMember
  public tier: number;

  @jsonMember
  public active: number;

  @jsonMember
  public disposition: string;

  @jsonMember
  public min_cart: string;

  @jsonMember
  public quote_time: string;

  @jsonMember
  public division: string;

  @jsonMember
  public customize: string;

  @jsonMember
  public area_code: string;

  @jsonMember
  public owner_code: string;

  @jsonMember
  public owner_name: string;

  @jsonMember
  public online_order: boolean;

  @jsonMember
  public offline_order: boolean;

  @jsonMember
  public alcohol_drinks_available: boolean;

  @jsonMember
  public payment_accepted: string;

  @jsonMember
  public delivery_fee: number;

  @jsonMember
  public from_date: Date;

  @jsonMember
  public to_date: Date;

  @jsonMember
  public is_open: boolean;

  // This member is always defaulted to []
  // @jsonMember
  // public aggregators: string;
}
