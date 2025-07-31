import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../model/User.model";
import { where } from "sequelize";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const user = await User.create({ name, email, password: hashedPassword })
        res.status(201).json(user)

    } catch (error) {
        res.status(400).json({ error: 'User already exisit' })

    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user: any = await User.findOne({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invaid Credintials' })
    }
    const token = jwt.sign({ id: user.id }, 'ABINESH')
    res.json({ token })
}