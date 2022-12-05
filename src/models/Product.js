import Mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const schema = new Mongoose.Schema(
	{
		name: String,
		img: String,
		newest: Boolean,
		price: {
			actual: Number,
			old: Number
		},
		colors: [String],
		category: String,
		desc: String
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

const Product = Mongoose.model('Product', schema)

export default Product
