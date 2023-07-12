import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Producto = sequelize.define("Producto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre : {
        type: DataTypes.STRING,
    },
    codigo : {
        type: DataTypes.STRING,
    },
    precio : {
        type: DataTypes.INTEGER,
    },
    cantidad : {
        type: DataTypes.INTEGER,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});