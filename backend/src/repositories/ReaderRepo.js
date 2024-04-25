import {Reader} from '../models/index.js'
import {Exception} from '../exceptions/index.js'
import mongoose  from 'mongoose'

const getAllReader = async ({
    page, 
    size,
    searchString,
}) => {
    page = parseInt(page);
    size = parseInt(size);
    let filteredPipeline = [
        {
            $match: {
                $or: [
                    {
                        MaDocGia: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        HoLot: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        Ten: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size }
    ];

    let countPipeline = [
        {
            $match: {
                $or: [
                    {
                        MaDocGia: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        HoLot: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        Ten: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                ]
            }
        },
        { $count: "totalCount" }
    ];

    let [filteredReaders, countResult] = await Promise.all([
        Reader.aggregate(filteredPipeline),
        Reader.aggregate(countPipeline)
    ]);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    return { filteredReaders, totalCount };
};

const getReaderById = async(readerId) => {
    const reader = await Reader.findById(readerId)
    if (!reader)
            throw new Exception('Reader not found')
    if(!reader) {
        throw new Exception('Cannot find reader with id ' + readerId)
    }
    return reader 
}

const getReaderByMaDocGia = async(readerMNV) => {
    const reader = await Reader.findOne({ 'MaDocGia': readerMNV }).exec()
    if (!reader)
            throw new Exception('Reader not found')
    return reader 
}

const addReader = async ({
    MaDocGia='', 
    HoLot='', 
    Ten='', 
    NgaySinh=Date.now() - (8 * 365 * 24 * 60 * 60 * 1000), 
    Phai='Nam',
    DiaChi='',
    DienThoai = '0298372611'
}) => {
    const existingReader = await Reader.findOne({ MaDocGia }).exec()
    if (!!existingReader) 
        throw new Exception(Exception.USER_EXIST)
    
    const reader = await Reader.create({
        MaDocGia, 
        HoLot, 
        Ten, 
        NgaySinh,
        Phai,
        DiaChi,
        DienThoai
    })
    return reader
}

const updateReader = async ({
    _id,
    MaDocGia, 
    HoLot, 
    Ten, 
    NgaySinh, 
    Phai,
    DiaChi,
    DienThoai
}) => {  
    if (_id){
        const reader = await Reader.findById(_id)
        if (!reader)
            throw new Exception('Không tìm thấy đọc giả')
        if (MaDocGia && MaDocGia != reader.MaDocGia){
            const num = await Reader.countDocuments({ MaDocGia}).exec()
            if (num > 0)
                throw new Exception('Mã đọc giả đã tồn tại')
        }
        reader.MaDocGia = MaDocGia ?? reader.MaDocGia
        reader.HoLot = HoLot ?? reader.HoLot
        reader.Ten = Ten ?? reader.Ten
        reader.Ten = Ten ?? reader.Ten
        reader.NgaySinh = NgaySinh ?? reader.NgaySinh
        reader.Phai = Phai ?? reader.Phai
        reader.DiaChi = DiaChi ?? reader.DiaChi
        reader.DienThoai = DienThoai ?? reader.DienThoai
        await reader.save()
        return reader   
    }else {
        throw new Exception('Dữ liệu thiếu _id')
    }
}

const deleteReader = async ({
    id,
    MaDocGia
}) => { 
    if (id || MaDocGia){ 
        let deletedReader = ''
        if (id){
            deletedReader = await Reader.findByIdAndDelete(id)
        } else {
            let temp =  await Reader.findOne({MaDocGia})
            deletedReader = await Reader.findByIdAndDelete(temp._id)
        }
        if (!deletedReader)
            throw new Exception('Reader not found')
        return deletedReader
    }else {
        throw new Exception('Data must have id or MaDocGia')
    }
}

export default {
    getAllReader,
    getReaderById,
    getReaderByMaDocGia,
    addReader,
    updateReader,
    deleteReader,
}