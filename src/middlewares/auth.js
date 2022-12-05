import { verifyToken } from '$utils/jwt'

const authen = async (req, res, next) => {
	const { authorization } = req.headers
	const token = authorization && authorization.split(' ')[1]

	try {
		const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY)
		req.userId = decoded.id

		return next()
	} catch (err) {
		return res.status(401).json({ message: err.message })
	}
}

const author = roles => async (req, res, next) => {
	const { authorization } = req.headers
	const token = authorization && authorization.split(' ')[1]

	try {
		const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY)

		if (roles.some(role => decoded.roles.includes(role))) {
			req.userId = decoded.id

			return res.status(403).json({
				message: "Access denied, you don't have permission to access"
			})
		}
	} catch (err) {
		return res.status(401).json({ message: err.message })
	}
}

export { authen, author }
