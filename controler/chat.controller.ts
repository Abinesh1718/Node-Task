import { Request, Response } from "express";

import fs from 'fs'
import * as XLSX from 'xlsx'
import { Chat } from "../model/Chat.model";

export const createChat = async (req: any, res: Response) => {
    const file = req.file;
    const workbook = XLSX.readFile(file.path)

    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)

    const records = data.map((row: any) => ({
        sender: row.sender,
        message: row.message,
        timestamp: new Date(row.timestamp),
        user_id: req.user.id
    }))

    await Chat.bulkCreate(records)
    fs.unlinkSync(file.path)
    res.json({ message: 'Imported Successfully' })
}