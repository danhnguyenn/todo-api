import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const verifyToken = (token, options) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, options, (err, decoded) => {
			if (err) {
				return reject(err)
			}
			return resolve(decoded)
		})
	})

const generateToken = (payload, options = {}) =>
	new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_SECRET_KEY,
			{
				...options,
				expiresIn: process.env.ACCESS_TOKEN_LIFETIME
			},
			(err, token) => {
				if (err) {
					return reject(err)
				}
				return resolve(token)
			}
		)
	})

const verifyRefreshToken = (token, options) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, options, (err, decoded) => {
			if (err) {
				return reject(err)
			}
			return resolve(decoded)
		})
	})

const generateRefreshToken = (options = {}) =>
	new Promise((resolve, reject) => {
		jwt.sign(
			{ [uuidv4()]: uuidv4() },
			process.env.REFRESH_TOKEN_SECRET_KEY,
			{
				...options,
				expiresIn: process.env.REFRESH_TOKEN_LIFETIME
			},
			(err, token) => {
				if (err) {
					return reject(err)
				}
				return resolve(token)
			}
		)
	})

export { verifyToken, generateToken, verifyRefreshToken, generateRefreshToken }
