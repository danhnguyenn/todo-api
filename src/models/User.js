import bcrypt from 'bcrypt'
import Mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const schema = new Mongoose.Schema(
	{
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		gender: String,
		birthday: Date,
		avatar: String,
		phone: String,
		address: String,
		roles: Array,
		refreshToken: String
	},
	{
		timestamps: true
	}
)

schema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true
})

schema.methods.verifyPassword = function (password) {
	return bcrypt.compare(password, this.password)
}

schema.virtual('id').get(function () {
	return this._id.toHexString()
})

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id
		delete ret.password
		delete ret.refreshToken
		delete ret.deleted
		delete ret.createdAt
		delete ret.updatedAt
	}
})

schema.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, 10)
})

const User = Mongoose.model('User', schema)

export default User
