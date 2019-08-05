import dotenv from 'dotenv';

import { DbMappable } from './libs/importers/types';

import * as logger from './libs/logger';
import sequelize from './configs';

import * as importerBuilder from './libs/importer-builder';
import DataParser from './libs/parsers';

logger.info('Starting importer and establishing access to database.');
dotenv.config();
sequelize();

var args = process.argv.slice(2);
logger.info(`Commandline arguments ${JSON.stringify(args)}`);

switch (args[0]) {
case 'outlets':
  logger.info('Building outlets importer.');

  const parserResult = DataParser.parseJSON_outlets('[]');
  console.log(parserResult);

  importerBuilder.buildAndImport(DbMappable.outlets, []);
  break;
default:
  logger.warn('Importer is not ready for that processing type.');
}
