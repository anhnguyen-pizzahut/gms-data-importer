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
}
