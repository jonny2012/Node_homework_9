import { Sequelize } from "sequelize";
import configData from "./config.json" assert {type:"json"}

const env = "development"

const config = configData[env]
export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host:config.host,
        dialect:config.dialect
    }
)
