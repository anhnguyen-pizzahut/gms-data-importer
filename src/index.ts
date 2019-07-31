import dotenv from 'dotenv';
import * as logger from './libs/logger';
// import sequelize from './configs';
import * as sourceMapperBuilder from './libs/source-mapper-builder';

dotenv.config();

logger.info('Starting importer.');

logger.info('Establishing access to database.');

logger.info('Creating importer.');
sourceMapperBuilder.build();
