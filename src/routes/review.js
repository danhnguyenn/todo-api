import reviewController from '$controllers/review'
import { Router } from 'express'

const reviewRoute = Router()

reviewRoute.post('/', reviewController.create)
reviewRoute.get('/random', reviewController.random)

export default reviewRoute
