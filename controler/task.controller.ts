import { Request, Response } from "express";
import { Task } from "../model/Task.model";
import { where } from "sequelize";

export const createTask = async (req: any, res: Response) => {
    const { title, status } = req.body
    const task = await Task.create({ title, status, user_id: req.user.id })
    res.status(201).json(task)
}

export const getTask = async (req: any, res: Response) => {
    const status = req.query.status
    const filter: { [key: string]: any } = {
        user_id: req.user.id
    }

    if (status && status !== 'all') {
        filter.status = status
    }

    const tasks = await Task.findAll({ where: filter })
    res.status(201).json(tasks)
}

