import { ObjectId, Schema } from 'mongoose'
import mongoose from 'mongoose'

const BookSchema = new Schema({
        id: { type: ObjectId },
        MaSach: {
            type: String,
            required: true,
            unique: true,
        },
        TenAnh: {
            type: String,
        },
        TenSach: {
            type: String,
            required: true,
        },
        DonGia: {
            type: Number,
            required: true,
        },
        SoQuyen: {
            type: Number,
            required: true,
        },
        NamXuatBan: {
            type: Number,
        },
        MaNXB: {
            type: ObjectId,
            required: true,
            ref: 'Publisher',
        },
        TenTacGia: {
            type: String,
        },
    })

BookSchema.pre('findOneAndDelete', { document: false, query: true },function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("BookCard").deleteMany({'MaSach': publisherId}).exec()
  next()
})

BookSchema.pre('findByIdAndDelete',{ document: false, query: true }, function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("BookCard").deleteMany({'MaSach': publisherId}).exec()
  next()
})

BookSchema.pre('deleteOne',{ document: false, query: true }, function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("BookCard").deleteMany({'MaSach': publisherId}).exec()
  next()
})

const Book = mongoose.model(
    'Book',
    BookSchema,
)

export default Book
