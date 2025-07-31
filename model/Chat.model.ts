import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Chat = sequelize.define('Chat', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sender: { type: DataTypes.STRING, },
    message: { type: DataTypes.STRING, },
    timeStamp: { type: DataTypes.DATE, },
    user_id: { type: DataTypes.INTEGER, },
})