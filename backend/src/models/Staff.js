import { ObjectId, Schema } from 'mongoose'
import mongoose from 'mongoose'
import isMobilePhone from 'validator/lib/isMobilePhone.js'

const Staff = mongoose.model(
    'Staff',
    new Schema({
        id: { type: ObjectId },
        MSNV: {
            type: String,
            required: true,
            unique: true,
        },
        HoTenNV: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
        Chucvu: {
            type: String,
            required: true,
        },
        Diachi: {
            type: String,
        },
        SoDienThoai: {
            type: String,
            validate: {
                validator: (value) => isMobilePhone,
                message: 'Phone is incorrect format',
            },
        },
    }),
)

export default Staff
