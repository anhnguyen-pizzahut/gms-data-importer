import { DbMappable } from './importers/types';
import Outlet from '../models/source/outlet';

import * as logger from './logger';

import DataImporter from './importers/outlets';

export function buildAndImport(identifier: DbMappable, data: Object[]) {
  logger.info('Building mapper object.');
  try {
    if (data.length > 0) {
      switch (identifier) {
        case DbMappable.outlets:
          data.forEach(async (outlet: Promise<Outlet>) => {
            // console.log(await outlet);
            DataImporter.getInstance().persist(await outlet);
          });
          return true;
        default:
          logger.warn('No mapper found.');
          return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    logger.warn(error);
    return false;
  }
}
