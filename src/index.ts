import dotenv from 'dotenv';

import * as logger from './libs/logger';
import readline from 'readline';
import * as importerBuilder from './libs/importer-builder';

import { DbMappable } from './libs/importers/types';
import { initializeDatabaseConnection } from './configs';
import DataParser from './libs/parsers';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

logger.info('Verifying environment variables...');
logger.info(`HOST: ${process.env.MYSQL_HOST}`);
logger.info(`USERNAME: ${process.env.MYSQL_USERNAME}`);
logger.info(`PASSWORD: ${process.env.MYSQL_PASSWORD}`);

rl.question('Are you sure you would like to proceed? ', answer => {
  rl.close();

  if (answer !== 'y') return;

  logger.info('Starting importer.');

  var args = process.argv.slice(2);
  logger.info(`Commandline arguments ${JSON.stringify(args)}`);

  switch (args[0]) {
    case 'outlet':
      logger.info(`Establishing access to database ${args[0]}`);
      initializeDatabaseConnection(args[0].trim());
      logger.info('Building outlets importer.');
      DataParser.getAndParseOutlets().then(async outlets => {
        logger.info(`Importing ${(await outlets).length}, please wait...`);
        logger.info(`Job started at ${new Date().toUTCString()}`);
        importerBuilder.buildAndImport(DbMappable.outlets, outlets);
      });
      break;
    case 'sync-redis-outlets-opening-hours':
      logger.warn('TODO: To be implemented soon.');
      break;
    default:
      logger.warn('Importer is not ready for that processing type.');
  }
});

process.on('exit', () => {
  logger.info(`Job ended at ${new Date().toUTCString()}`);
});
