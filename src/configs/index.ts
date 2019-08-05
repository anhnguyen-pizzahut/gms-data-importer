import {Sequelize} from 'sequelize-typescript';
import * as config from './database';

// import DbOutlet from '../models/database/db-outlet';
 
const sequelize =  new Sequelize(config.devConfigs);

export function initializeDatabaseConnection() {
  return sequelize;
};

export const S3_BUCKET_URLS = {
  IMPORT_OUTLETS: 'https://steve-phdv-releases.s3-ap-southeast-1.amazonaws.com/dumps/outlets-import.csv'
}
