import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy meat', completedAt: new Date() }
]

export class TodosController {
    // * DI
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'Bad Request. ID is not a number.' })
            return
        }

        const todo = todos.find(todo => todo.id === id)

        todo
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) {
            res.status(400).json({ error: 'Text' })
            return
        }

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }

        todos.push(newTodo)
        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'Bad Request. ID is not a number.' })
            return
        }

        const todo = todos.find(todo => todo.id === id)

        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id} not found` })
            return
        }

        const { text, completedAt } = req.body
        if (!text) {
            res.status(400).json({ error: 'Text' })
            return
        }

        todo.text = text || todo.text
        completedAt === 'null'
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt)

        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ error: 'Bad Request. ID is not a number.' })
            return
        }

        const index = todos.findIndex((todo) => todo.id === id)
        if (!index) {
            res.status(404).json({ error: 'No existe registro con ese ID.' })
        }

        todos.splice(index, 1)
        res.json("Registro eliminado correctamente.")
    }
}