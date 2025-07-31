import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from "multer";
import { User } from "../model/User.model";
import { Task } from "../model/Task.model";
import { Chat } from "../model/Chat.model";
import { Op } from "sequelize";
import { NextFunction } from 'express';
import { createTask, getTask } from "../controler/task.controller";
import { login, register } from "../controler/auth.controler";
import { authenticate } from "../controler/auth.middleware";
import { createChat } from "../controler/chat.controller";
import { error } from "console";
import * as XLSX from 'xlsx'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()
router.post('/register', register)

router.post('/login', login)

router.post('/tasks', authenticate, createTask)
router.get('/tasks', authenticate, getTask)
router.post('/chats/import', authenticate, upload.single('file'), async (req: Request & { user?: any }, res: Response) => {
    if (!req.file) return res.status(400).json({ error: 'no file uploaded' })

    const workbook = XLSX.readFile(req.file.path)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(sheet)

    try {
        const chats = await Promise.all(rows.map(async (row: any) => {
            return Chat.create({
                sender: row.sender,
                message: row.message,
                timestamp: new Date(row.timestamp),
                user_id: req.user.id
            })
        }))

        res.json({ message: "Chats imported", count: chats.length })

    } catch (error) {
        return res.status(403).json({ error: 'Failed to Import chats' })
    }


})


export default router