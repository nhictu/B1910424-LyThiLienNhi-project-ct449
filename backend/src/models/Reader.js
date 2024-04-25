import { ObjectId, Schema } from 'mongoose'
import mongoose from 'mongoose'
import isMobilePhone from 'validator/lib/isMobilePhone.js'

const ReaderSchema =  new Schema({
        id: { type: ObjectId },
        MaDocGia: {
            type: String,
            required: true,
            unique: true,
        },
        HoLot: {
            type: String,
        },
        Ten: {
            type: String,
            required: true,
        },
        NgaySinh: {
            type: String,
        },
        Phai: {
            type: String,
            enum: ['Nam', 'Nữ'],
            message: '{VALUE} is not supported',
        },
        DiaChi: {
            type: String,
        },
        DienThoai: {
            type: String,
            validate: {
                validator: (value) => isMobilePhone,
                message: 'Phone is incorrect format',
            },
        },
    })

ReaderSchema.pre('findOneAndDelete', { document: false, query: true },function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("BookCard").deleteMany({'MaDocGia': publisherId}).exec()
  next()
})

ReaderSchema.pre('findByIdAndDelete',{ document: false, query: true }, function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("BookCard").deleteMany({'MaDocGia': publisherId}).exec()
  next()
})

ReaderSchema.pre('deleteOne',{ document: false, query: true }, function(next) {
  const doc = this.model.findOne(this.getFilter())
  const publisherId = this.getQuery()["_id"]
  mongoose.model("BookCard").deleteMany({'MaDocGia': publisherId}).exec()
  next()
})

const Reader = mongoose.model(
    'Reader',
    ReaderSchema,
)
export default Reader
