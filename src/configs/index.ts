import { Sequelize } from 'sequelize-typescript';
import * as db from './database';

const GOOGLE_API_KEY = 'AIzaSyAWBctgbej54pi4S96uw0IpQRYOSC9hpT4';

function validateConnectionEnvironment(): boolean {
  return (
    process.env.MYSQL_HOST !== null &&
    process.env.MYSQL_HOST !== undefined &&
    (process.env.MYSQL_USERNAME !== null &&
      process.env.MYSQL_USERNAME !== undefined) &&
    (process.env.MYSQL_PASSWORD !== null &&
      process.env.MYSQL_PASSWORD !== undefined)
  );
}

export function initializeDatabaseConnection(database) {
  if (validateConnectionEnvironment()) {
    return new Sequelize(db.buildConnection(database));
  } else {
    throw new Error('Error reading connection parameters.');
  }
}

export const S3_BUCKET_URLS = {
  IMPORT_OUTLETS:
    'https://steve-phdv-releases.s3-ap-southeast-1.amazonaws.com/dumps/outlets-import.csv'
};

export const GOOGLE_API_PLACES_FIND_FROM_TEXT_API = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={0}&inputtype=textquery&fields=formatted_address,geometry&key=${GOOGLE_API_KEY}`;
