import { ImporterOperations } from './operations';

import DbOutletOpeningHour from '../../models/database/db-outlet-opening-hours';
import OutletOpeningHour from '../../models/source/outlet-opening-hour';

export default class OutletsOpeningHoursImporter
  implements ImporterOperations<OutletOpeningHour, DbOutletOpeningHour> {
  private static instance: OutletsOpeningHoursImporter;

  private constructor() {}

  public static getInstance(): OutletsOpeningHoursImporter {
    if (OutletsOpeningHoursImporter.instance) {
      return OutletsOpeningHoursImporter.instance;
    } else {
      return new OutletsOpeningHoursImporter();
    }
  }

  async parseAndProduce(data: OutletOpeningHour): Promise<DbOutletOpeningHour> {
    return DbOutletOpeningHour.build({
      client_id: data.client_id || 126,
      outlet_id: data.outlet_id || null,
      day: data.day || null,
      opening: data.opening || null,
      closing: data.closing || null,
      active: data.active || true
    });
  }

  public async persist(data: OutletOpeningHour): Promise<boolean> {
    try {
      const result = await this.parseAndProduce(data);
      await result.save();
      return true;
    } catch (error) {
      return false;
    }
  }
}
