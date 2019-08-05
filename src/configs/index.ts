import {Sequelize} from 'sequelize-typescript';
import * as config from './database';

// import DbOutlet from '../models/database/db-outlet';
 
const sequelize =  new Sequelize(config.devConfigs);

export default function initializeDatabaseConnection() {
  return sequelize;
};
