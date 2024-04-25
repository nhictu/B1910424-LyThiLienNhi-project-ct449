import { ObjectId, Schema } from 'mongoose'
import mongoose from 'mongoose'

const PublisherSchema = new Schema({
        id: { type: ObjectId },
        MaNXB: {
            type: String,
            required: true,
            unique: true,
        },
        TenNXB: {
            type: String,
            required: true,
        },
        DiaChi: {
            type: String,
        },
    })

PublisherSchema.pre('findOneAndDelete', { document: false, query: true },function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("Book").deleteMany({'MaNXB': publisherId}).exec()
  next()
})

PublisherSchema.pre('findByIdAndDelete',{ document: false, query: true }, function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("Book").deleteMany({'MaNXB': publisherId}).exec()
  next()
})

PublisherSchema.pre('deleteOne',{ document: false, query: true }, function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("Book").deleteMany({'MaNXB': publisherId}).exec()
  next()
})

const Publisher = mongoose.model(
    'Publisher',
    PublisherSchema,
)

export default Publisher
