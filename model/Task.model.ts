import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' },
    user_id: { type: DataTypes.INTEGER, allowNull: false },


})