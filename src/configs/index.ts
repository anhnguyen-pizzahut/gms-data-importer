import {Sequelize} from 'sequelize-typescript';
import * as config from './database';

config.devConfigs.modelPaths = [
  __dirname + '/../models/dest'
]
 
const sequelize =  new Sequelize(config.devConfigs);

export default sequelize;
