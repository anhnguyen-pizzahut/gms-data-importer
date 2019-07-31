import dotenv from 'dotenv';
import * as logger from './libs/logger';
import * as sourceMapperBuilder from './libs/source-mapper-builder';

dotenv.config();

logger.info('Starting importer.');
logger.info('Creating importer.');

sourceMapperBuilder.build();
