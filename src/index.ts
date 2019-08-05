import dotenv from 'dotenv';

import * as logger from './libs/logger';
import * as importerBuilder from './libs/importer-builder';

import { DbMappable } from './libs/importers/types';
import { initializeDatabaseConnection } from './configs';
import DataParser from './libs/parsers';

logger.info('Starting importer and establishing access to database.');
dotenv.config();
initializeDatabaseConnection();

var args = process.argv.slice(2);
logger.info(`Commandline arguments ${JSON.stringify(args)}`);

switch (args[0]) {
  case 'outlets':
    logger.info('Building outlets importer.');
    DataParser.getAndParseOutlets().then(outlets => {
      importerBuilder.buildAndImport(DbMappable.outlets, outlets);
    });
    break;
  default:
    logger.warn('Importer is not ready for that processing type.');
}
