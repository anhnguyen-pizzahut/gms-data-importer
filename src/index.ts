import dotenv from 'dotenv';

import { Mappable } from './libs/constants';

import * as logger from './libs/logger';
import sequelize from './configs';
import * as importerBuilder from './libs/importer-builder';

logger.info('Starting importer and establishing access to database.');
dotenv.config();
sequelize();

var args = process.argv.slice(2);
logger.info(`Commandline arguments ${JSON.stringify(args)}`);

switch (args[0]) {
case 'outlets':
  logger.info('Building outlets importer.');
  importerBuilder.build(Mappable.outlets, [
    {
      "clientId": 126,
      "code": "TEST_CODE",
      "name": "OUTLET_NAME",
    }
  ]);
  break;
default:
  logger.warn('Importer is not ready for that processing type.');
}
