import { DbMappable } from './importers/types';
import Outlet from '../models/raw/outlet';

import * as logger from './logger';

import DataImporter from './importers/outlets';

export function buildAndImport(identifier: DbMappable, data: Object[]) {
  logger.info('Building mapper object.');
  try {
    if (data.length > 0) {
      switch (identifier) {
        case DbMappable.outlets:
          data.forEach((outlet: Outlet) => {
            DataImporter.getInstance().persist(outlet);
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
