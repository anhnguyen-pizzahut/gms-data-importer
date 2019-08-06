import { SequelizeOptions } from 'sequelize-typescript';

const sharedConfigs = {
  modelPaths: [__dirname + '/../models/database']
};

export const buildConnection = database => {
  const connectionsParameters: SequelizeOptions = {
    database: database,
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    modelPaths: sharedConfigs.modelPaths,
    logging: false
  };
  return connectionsParameters;
};
