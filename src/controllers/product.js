import Product from '$models/Product'

const productController = {
	index: async (req, res, next) => {
		try {
			const { sortByPrice, categories } = req.query
			let products

			if (sortByPrice && categories) {
				products = await Product.find({
					category: categories
				}).sort({
					'price.actual': sortByPrice
				})
			} else if (sortByPrice) {
				products = await Product.find().sort({
					'price.actual': sortByPrice
				})
			} else if (categories) {
				products = await Product.find({
					category: categories
				})
			} else {
				products = await Product.find()
			}

			return res.status(200).json({
				message: 'Get products successfully',
				products
			})
		} catch (err) {
			return next(err)
		}
	},

	create: async (req, res, next) => {
		try {
			const product = new Product(req.body)
			await product.save()
			return res.status(200).json({
				message: 'Create products successfully',
				product
			})
		} catch (err) {
			return next(err)
		}
	},

	show: async (req, res, next) => {
		try {
			const { id } = req.params
			const product = await Product.findById(id)
			return res.status(200).json({
				message: 'Create products successfully',
				product
			})
		} catch (err) {
			return next(err)
		}
	},

	newest: async (req, res, next) => {
		try {
			const products = await Product.find().sort('-updatedAt').limit(8)
			return res.status(200).json({
				message: 'Get products successfully',
				products
			})
		} catch (err) {
			return next(err)
		}
	},

	related: async (req, res, next) => {
		try {
			const { category } = req.query
			const products = await Product.find({
				category
			}).limit(8)
			return res.status(200).json({
				message: 'Get products successfully',
				products
			})
		} catch (err) {
			return next(err)
		}
	}
}

export default productController
