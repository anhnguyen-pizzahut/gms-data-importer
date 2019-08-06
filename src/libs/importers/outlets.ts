import uuid from 'uuid';

import { ImporterOperations } from './operations';

import DbOutlet from '../../models/database/db-outlet';
import Outlet from '../../models/source/outlet';
// import { formatNamedParameters, toDefaultValue } from 'sequelize/types/lib/utils';

export default class OutletsImporter
  implements ImporterOperations<Outlet, DbOutlet> {
  private static instance: OutletsImporter;

  private constructor() {}

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

  async parseAndProduce(data: Outlet): Promise<DbOutlet> {
    return DbOutlet.build({
      client_id: data.client_id || 126,
      name: data.name || null,
      uuid: uuid(),
      zip: (data.zip && data.zip.length <= 10 ? data.zip.trim() : null),
      code: this.getRandomCode(9999),
      description: data.description || null,
      address: data.address || null,
      street: data.street || null,
      lat: data.lat || null,
      long: data.long || null,
      timezone: 'America/Sao_Paulo',
      phone: data.phone || null,
      tier: data.tier || null,
      active: true,
      disposition: data.disposition || null,
      min_cart: data.min_cart || null,
      quote_time: data.quote_time || null,
      division: data.division || null,
      customize: data.customize || '{"remarks":[{"value":null}]}',
      area_code: data.area_code || 'BC0111',
      owner_code: data.owner_code || null,
      owner_name: data.owner_name || null,
      online_orders: data.online_order || 1,
      offline_orders: data.offline_order || 1,
      alcohol_drinks_available: data.alcohol_drinks_available || 0,
      payment_accepted:
        data.payment_accepted ||
        '{"cash":{"active":1,"min":0,"max":9999999999},"credit_card":{"active":1,"min":0,"max":9999999999},"credit_card_online":{"active":1,"min":0,"max":9999999999}}',
      delivery_fee: data.delivery_fee || 0,
      from_date: data.from_date || new Date(),
      to_date: data.to_date || new Date(2999, 11, 29),
      is_open: data.is_open || 1,
      aggregators: '[]' // always empty by default
    });
  }

  public async persist(data: Outlet): Promise<DbOutlet> {
    try {
      const result = await this.parseAndProduce(data);
      result.save();
      return result;
    } catch (error) {
      return null;
    }
  }
}
