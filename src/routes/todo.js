import todoController from '$controllers/todo'
import { Router } from 'express'

const todoRoute = Router()

todoRoute.get('/', todoController.index)
todoRoute.post('/', todoController.create)
todoRoute.get('/:id', todoController.show)
todoRoute.put('/:id', todoController.update)
todoRoute.delete('/:id', todoController.destroy)

export default todoRoute
