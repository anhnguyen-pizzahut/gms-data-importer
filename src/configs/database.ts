import { SequelizeOptions } from "sequelize-typescript";

export const devConfigs:SequelizeOptions = {
  database: "outlets",
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  modelPaths: []
}
