import uuid from 'uuid';

import { ImporterOperations } from './operations';

import DbOutlet from '../../models/database/db-outlet';
import Outlet from '../../models/raw/outlet';
// import { formatNamedParameters, toDefaultValue } from 'sequelize/types/lib/utils';

export default class OutletsImporter implements ImporterOperations<Outlet, DbOutlet> {
  private static instance: OutletsImporter;
  
  private constructor() { }

  private getRandomCode(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public static getInstance(): OutletsImporter {
    if (OutletsImporter.instance) {
      return OutletsImporter.instance;
    } else {
      return new OutletsImporter();
    }
  }

  parseAndProduce(data: Outlet): DbOutlet {
    return DbOutlet.build({
      client_id: data.client_id || 126,
      name: data.name,
      uuid: uuid(),
      zip: data.zip,
      code: this.getRandomCode(9999),
      description: data.description,
      address: data.address,
      street: data.street,
      lat: data.lat,
      long: data.long,
      timezone: 'America/Sao_Paulo',
      phone: data.phone,
      tier: data.tier,
      active: true,
      disposition: data.disposition,
      min_cart: data.min_cart,
      quote_time: data.quote_time,
      division: data.division,
      customize: data.customize || '{"remarks":[{"value":null}]}',
      area_code: data.area_code || 'BC0111',
      owner_code: data.owner_code,
      owner_name: data.owner_name,
      online_orders: data.online_order || 1,
      offline_orders: data.offline_order || 1,
      alcohol_drinks_available: data.alcohol_drinks_available || 0,
      payment_accepted: data.payment_accepted || '{"cash":{"active":1,"min":0,"max":9999999999},"credit_card":{"active":1,"min":0,"max":9999999999},"credit_card_online":{"active":1,"min":0,"max":9999999999}}',
      delivery_fee: data.delivery_fee || 0,
      from_date: data.from_date || new Date(),
      to_date: data.to_date || new Date(2999, 11, 29),
      is_open: data.is_open || 1,
      aggregators: '[]', // always empty by default
    });
  }

  public async persist(data: Outlet): Promise<DbOutlet> {
    const result = await this.parseAndProduce(data).save();
    return result;
  }
}