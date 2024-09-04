import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("users", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
 
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false, 
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mustChangePassword:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    role:{ 
        type:DataTypes.STRING,
        defaultValue: "USER"
    }

},
{
    tableName:"users",
    timestamps:false
})
// User.sync({ force: true })