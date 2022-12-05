import User from '$models/User'
import { generateRefreshToken, generateToken, verifyRefreshToken } from '$utils/jwt'

const userController = {
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email })

			if (!user) {
				return res.status(400).json({
					message: 'Email does not exits'
				})
			}
			if (!(await user.verifyPassword(password))) {
				return res.status(400).json({
					message: 'Password incorrect'
				})
			}

			const payload = {
				id: user.id,
				roles: user.roles
			}
			const token = await generateToken(payload)
			const refreshToken = await generateRefreshToken()

			await user.updateOne({ refreshToken })

			return res.status(200).json({
				message: 'Login successfully',
				user,
				token,
				refreshToken
			})
		} catch (err) {
			return res.status(400).json({
				message: err.message
			})
		}
	},

	logout: async (req, res, next) => {
		try {
			await User.findByIdAndUpdate(req.userId, { refreshToken: null })

			return res.status(200).json({
				message: 'Logout successfully'
			})
		} catch (err) {
			return res.status(400).json({
				message: err.message
			})
		}
	},

	register: async (req, res, next) => {
		try {
			const user = new User(req.body)
			const refreshToken = await generateRefreshToken()

			user.roles = ['Guest']
			user.refreshToken = refreshToken

			const payload = {
				id: user.id,
				roles: user.roles
			}
			const token = await generateToken(payload)

			await user.save()

			return res.status(200).json({
				message: 'Register account successfully',
				user,
				token,
				refreshToken
			})
		} catch (err) {
			return res.status(400).json({
				message: err.message
			})
		}
	},

	refreshToken: async (req, res, next) => {
		try {
			const user = await User.findOne({
				refreshToken: req.body.refreshToken
			})

			if (!user) {
				return res.status(400).json({
					message: 'Refresh token does not exits'
				})
			}

			await verifyRefreshToken(req.body.refreshToken)

			const payload = {
				id: user.id,
				roles: user.roles
			}
			const token = await generateToken(payload)
			const refreshToken = await generateRefreshToken()

			await user.updateOne({ refreshToken })

			return res.status(200).json({
				message: 'Refresh token successfully',
				token,
				refreshToken
			})
		} catch (err) {
			return res.status(400).json({
				message: err.message
			})
		}
	}
}

export default userController
