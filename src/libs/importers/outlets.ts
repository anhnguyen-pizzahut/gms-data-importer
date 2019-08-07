import uuid from 'uuid';
import crypto from 'crypto';

import { ImporterOperations } from './operations';
import * as logger from '../logger';

import DbOutlet from '../../models/database/db-outlet';
import Outlet from '../../models/source/outlet';
import OutletsOpeningHoursImporter from './outlets-opening-hours';

export default class OutletsImporter
  implements ImporterOperations<Outlet, DbOutlet> {
  private static instance: OutletsImporter;

  private constructor() {}

  private getRandomCode(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private generateDedupeHash(data: Outlet) {
    return crypto
      .createHash('md5')
      .update(`${data.zip}_${data.code}_${data.name}`)
      .digest('hex');
  }

  private async checkIfOutletWasImported(data: DbOutlet) {
    const check = await DbOutlet.findAll({
      limit: 1,
      where: {
        aggregator_code: data.aggregator_code
      }
    });
    return check.length > 0;
  }

  public static getInstance(): OutletsImporter {
    if (OutletsImporter.instance) {
      return OutletsImporter.instance;
    } else {
      return new OutletsImporter();
    }
  }

  async parseAndProduce(data: Outlet): Promise<DbOutlet> {
    const now = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      0,
      0,
      0
    );
    const yesterday = now.setDate(now.getDate() - 1);
    return DbOutlet.build({
      client_id: data.client_id || 126,
      name: data.name || null,
      uuid: uuid(),
      zip: data.zip && data.zip.length <= 10 ? data.zip.trim() : null,
      code: data.code || null,
      description: data.description || null,
      address: data.address || null,
      street: data.street || null,
      lat: data.lat || 0,
      long: data.long || 0,
      timezone: 'America/Sao_Paulo',
      phone: data.phone || null,
      tier: data.tier || null,
      active: true,
      disposition: data.disposition || null,
      min_cart: data.min_cart || null,
      quote_time: data.quote_time || null,
      duration: '{"C":10, "D":15}',
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
      from_date: data.from_date || yesterday, // Move to yesterday to enable localization
      to_date: data.to_date || new Date(2999, 11, 29),
      is_open: data.is_open || 1,
      aggregators: '[]', // always empty by default
      aggregator_code: this.generateDedupeHash(data)
    });
  }

  public async persist(data: Outlet): Promise<boolean> {
    try {
      const record = await this.parseAndProduce(data);
      if ((await this.checkIfOutletWasImported(record)) === false) {
        const result = await record.save();
        data.opening_hours.forEach(async opening_hour => {
          opening_hour.outlet_id = result.dataValues.id;
          await OutletsOpeningHoursImporter.getInstance().persist(opening_hour);
        });
        return true;
      } else {
        logger.warn(
          `Skipping processing outlet ${data.code} since it was already imported.`
        );
        return false;
      }
    } catch (error) {
      logger.error(`Error occurred ${error}.`);
      return false;
    }
  }
}
