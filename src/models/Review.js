import Mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const schema = new Mongoose.Schema(
	{
		postedBy: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		content: String
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

const Review = Mongoose.model('Review', schema)

export default Review
