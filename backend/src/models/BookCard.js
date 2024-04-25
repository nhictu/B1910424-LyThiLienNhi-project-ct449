import { ObjectId, Schema } from 'mongoose'
import mongoose from 'mongoose'

const BookCard = mongoose.model(
    'BookCard',
    new Schema({
        id: { type: ObjectId },
        MaDocGia: {
            type: ObjectId,
            required: true,
            ref: 'Reader',
        },
        MaSach: {
            type: ObjectId,
            required: true,
            ref: 'Book',
        },
        NgayMuon: {
            type: String,
            required: true,
        },
        NgayTra: {
            type: String,
        },
    }),
)
export default BookCard
