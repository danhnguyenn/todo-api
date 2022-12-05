import authRoute from '$routes/auth'
import productRoute from '$routes/product'
import reviewRoute from '$routes/review'
import todoRoute from '$routes/todo'
import cors from 'cors'

const routes = app => {
	app.use(cors())
	app.use('/auth', authRoute)
	app.use('/product', productRoute)
	app.use('/review', reviewRoute)
	app.use('/todo', todoRoute)
}

export default routes
