import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export default class Outlet
{
  @jsonMember
  public clientId: number;

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
  public minCart: string;

  @jsonMember
  public quoteTime: string;

  @jsonMember
  public division: string;

  @jsonMember
  public customize: string;

  @jsonMember
  public areaCode: string;

  @jsonMember
  public ownerCode: string;

  @jsonMember
  public ownerName: string;

  @jsonMember
  public onlineOrder: boolean;

  @jsonMember
  public offlineOrder: boolean;

  @jsonMember
  public alcoholDrinksAvailable: boolean;

  @jsonMember
  public paymentAccepted: string;

  @jsonMember
  public deliveryFee: number;

  @jsonMember
  public fromDate: Date;

  @jsonMember
  public toDate: Date;

  @jsonMember
  public isOpen: boolean;

  // This member is always defaulted to []
  // @jsonMember
  // public aggregators: string;
}
