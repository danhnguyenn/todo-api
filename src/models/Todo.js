import Mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const schema = new Mongoose.Schema(
	{
		content: String,
		isCompleted: Boolean
	},
	{
		timestamps: true
	}
)

schema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true
})

schema.virtual('id').get(function () {
	return this._id.toHexString()
})

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id
		delete ret.deleted
		delete ret.createdAt
		delete ret.updatedAt
	}
})

const Todo = Mongoose.model('Todo', schema)

export default Todo
