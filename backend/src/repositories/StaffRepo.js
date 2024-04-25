import {Staff} from '../models/index.js'
import {Exception} from '../exceptions/index.js'
import mongoose  from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ({MSNV, Password}) => {
    let existingStaff = await Staff.findOne({MSNV}).exec()
    if(existingStaff) {
      let isMatch = await bcrypt.compare(Password, existingStaff.Password)
      if(!!isMatch) {
        let token = jwt.sign({
            data: existingStaff
          }, 
          process.env.JWT_SECRET,{
            expiresIn: '30 days'
          }          
        )
        const { Password, ...rest } = existingStaff.toObject()
        return {
          ...rest,
          token: token
        }
      } else {
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
}

const getAllStaff = async ({
    page, 
    size,
    searchString,
    id
}) => {
    page = parseInt(page);
    size = parseInt(size);
    let filteredPipeline = [
        {
            $match: {
                _id: { $ne: new mongoose.Types.ObjectId(id) },
                $or: [
                    { MSNV: { $regex: `.*${searchString}.*`, $options: 'i' } },
                    { HoTenNV: { $regex: `.*${searchString}.*`, $options: 'i' } },
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size }
    ];

    let countPipeline = [
        {
            $match: {
                _id: { $ne: new mongoose.Types.ObjectId(id) },
                $or: [
                    { MSNV: { $regex: `.*${searchString}.*`, $options: 'i' } },
                    { HoTenNV: { $regex: `.*${searchString}.*`, $options: 'i' } },
                ]
            }
        },
        { $count: "totalCount" }
    ];

    let [filteredStaffs, countResult] = await Promise.all([
        Staff.aggregate(filteredPipeline),
        Staff.aggregate(countPipeline)
    ]);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    return { filteredStaffs, totalCount };
};


const getStaffById = async(staffId) => {
    const staff = await Staff.findById(staffId)
    if (!staff)
            throw new Exception('Staff not found')
    const { Password, ...rest } = staff.toObject()
    return rest 
}

const getStaffByMSNV = async(staffMNV) => {
    const staff = await Staff.findOne({ 'MSNV': staffMNV }).exec()
    if (!staff)
            throw new Exception('Staff not found')
    const { Password, ...rest } = staff.toObject()
    return rest 
}

const addStaff = async ({
    MSNV='', 
    HoTenNV='', 
    Password='', 
    Chucvu='', 
    Diachi='',
    SoDienThoai=''
}) => {
    const existingStaff = await Staff.findOne({ MSNV }).exec()
    if (!!existingStaff) 
        throw new Exception(Exception.USER_EXIST)
    
    Password = await bcrypt.hash(
            Password, parseInt(process.env.SALT_ROUNDS))
    const staff = await Staff.create({
        MSNV, 
        HoTenNV, 
        Password, 
        Chucvu, 
        Diachi,
        SoDienThoai
    })
    const { Password: rem, ...rest } = staff.toObject()
    return rest
}

const updateStaff = async ({
    _id,
    MSNV, 
    HoTenNV, 
    Password, 
    Chucvu, 
    Diachi,
    SoDienThoai
}) => {  
    if (_id){
        const staff = await Staff.findById(_id)
        if (!staff)
            throw new Exception('Không tìm thấy nhân viên')
        if (MSNV && MSNV != staff.MSNV){
            const num = await Staff.countDocuments({ MSNV}).exec()
            if (num > 0)
                throw new Exception('Mã nhân viên đã tồn tại')
        }
        staff.MSNV = MSNV ?? staff.MSNV
        staff.HoTenNV = HoTenNV ?? staff.HoTenNV
        staff.Chucvu = Chucvu ?? staff.Chucvu
        staff.Diachi = Diachi ?? staff.Diachi
        staff.SoDienThoai = SoDienThoai ?? staff.SoDienThoai
        if (Password)
            staff.Password = await bcrypt.hash(
                Password ,parseInt(process.env.SALT_ROUNDS))
        await staff.save()
        const { Password: rem, ...rest } = staff.toObject()
        return rest   
    }else {
        throw new Exception('Dữ liệu thiếu _id')
    }
}

const deleteStaff = async ({
    id,
    MSNV
}) => { 
    if (id || MSNV){ 
        const deletedStaff = id ? await Staff.findByIdAndDelete(id) : await Staff.findOneAndDelete({MSNV})
        if (!deletedStaff)
            throw new Exception('Staff not found')
        return deletedStaff
    }else {
        throw new Exception('Data must have id or MSNV')
    }
}

export default {
    login,
    getAllStaff,
    getStaffById,
    getStaffByMSNV,
    addStaff,
    updateStaff,
    deleteStaff,
}