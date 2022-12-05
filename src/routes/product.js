import productController from '$controllers/product'
import { Router } from 'express'

const productRoute = Router()

productRoute.get('/', productController.index)
productRoute.post('/', productController.create)
productRoute.get('/newest', productController.newest)
productRoute.get('/related', productController.related)
productRoute.get('/:id', productController.show)

export default productRoute
