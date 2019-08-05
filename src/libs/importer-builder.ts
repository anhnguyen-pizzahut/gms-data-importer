import { Mappable } from './constants';
import Outlet from '../models/raw/outlet';

import * as logger from './logger';

import DataImporter from '../libs/importers/outlets-importer';

export function build(identifier: Mappable, source: Outlet[]) {
  logger.info('Building mapper object.');
  switch(identifier) {
    case Mappable.outlets:
      source.forEach((outlet: Outlet) => {
        DataImporter.getInstance().persist(outlet);
      });
      break;
    default:
      logger.warn('No mapper found.');
      return null;
  }
}
