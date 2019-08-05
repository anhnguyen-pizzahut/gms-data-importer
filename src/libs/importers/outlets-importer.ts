import uuid from 'uuid';

import { ImporterOperations } from './importer-operations';

import DbOutlet from '../../models/database/db-outlet';
import Outlet from '../../models/raw/outlet';
import { formatNamedParameters, toDefaultValue } from 'sequelize/types/lib/utils';

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
      client_id: data.clientId,
      name: data.name,
      uuid: uuid(),
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
      min_cart: data.minCart,
      quote_time: data.quoteTime,
      division: data.division,
      customize: data.customize,
      area_code: data.areaCode,
      owner_code: data.ownerCode,
      owner_name: data.ownerName,
      online_order: data.onlineOrder,
      offline_order: data.offlineOrder,
      alcohol_drinks_available: data.alcoholDrinksAvailable,
      payment_accepted: data.paymentAccepted,
      delivery_fee: deliveryFee,
      from_date: data.fromDate,
      to_date: data.toDate,
      is_open: data.isOpen,
      aggregators: '[]' // always empty by default
    });
  }

  public async persist(data: Outlet): Promise<DbOutlet> {
    const result = await this.parseAndProduce(data).save();
    return result;
  }
}