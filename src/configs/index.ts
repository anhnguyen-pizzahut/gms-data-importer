import { Sequelize } from 'sequelize-typescript';
import * as config from './database';

const GOOGLE_API_KEY = 'AIzaSyAWBctgbej54pi4S96uw0IpQRYOSC9hpT4';

const sequelize = new Sequelize(config.devConfigs);

export function initializeDatabaseConnection() {
  return sequelize;
}

export const S3_BUCKET_URLS = {
  IMPORT_OUTLETS:
    'https://steve-phdv-releases.s3-ap-southeast-1.amazonaws.com/dumps/outlets-import.csv'
};

export const GOOGLE_API_PLACES_FIND_FROM_TEXT_API = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={0}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${GOOGLE_API_KEY}`;
