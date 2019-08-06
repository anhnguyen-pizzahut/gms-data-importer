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
            logger.info(
              `Processing outlet ${
                (await outlet).code
              } at ${new Date().toUTCString()}`
            );
            await DataImporter.getInstance().persist(await outlet);
            logger.info(
              `Completed for outlet ${
                (await outlet).code
              } at ${new Date().toUTCString()}`
            );
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
