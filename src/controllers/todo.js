import Todo from '$models/Todo'

const todoController = {
	index: async (req, res, next) => {
		try {
			const todos = await Todo.find()

			return res.status(200).json({
				message: 'Get todos successfully',
				todos
			})
		} catch (err) {
			return next(err)
		}
	},

	create: async (req, res, next) => {
		try {
			const todo = new Todo(req.body)
			todo.isCompleted = false
			await todo.save()

			return res.status(200).json({
				message: 'Create todo successfully',
				todo
			})
		} catch (err) {
			return next(err)
		}
	},

	show: async (req, res, next) => {
		try {
			const todo = await Todo.findById(req.params.id)

			return res.status(200).json({
				message: 'Get todo successfully',
				todo
			})
		} catch (err) {
			return next(err)
		}
	},

	update: async (req, res, next) => {
		try {
			await Todo.findByIdAndUpdate(req.params.id, req.body)
			const todo = await Todo.findById(req.params.id)

			return res.status(200).json({
				message: 'Update todo successfully',
				todo
			})
		} catch (err) {
			return next(err)
		}
	},

	destroy: async (req, res, next) => {
		try {
			const todo = await Todo.findById(req.params.id)
			await Todo.deleteById(req.params.id)

			return res.status(200).json({
				message: 'Delete todo successfully',
				todo
			})
		} catch (err) {
			return next(err)
		}
	}
}

export default todoController
