import { SequelizeOptions } from "sequelize-typescript";

export const devConfigs: SequelizeOptions = {
  database: "outlet",
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  modelPaths: [__dirname + '/../models/database']
}
