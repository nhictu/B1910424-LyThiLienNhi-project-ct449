import {Book} from '../models/index.js'
import {Publisher} from '../models/index.js'
import {Exception} from '../exceptions/index.js'
import { ObjectId } from 'mongoose'

const getAllBook = async ({
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
                        MaSach: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        TenSach: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                ]
            }
        },
        { 
            $lookup: {
                from: 'publishers', 
                localField: 'MaNXB', 
                foreignField: '_id', 
                as: 'publisherInfo' 
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
                        MaSach: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        TenSach: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                ]
            }
        },
        { $count: "totalCount" }
    ];

    let [filteredBooks, countResult] = await Promise.all([
        Book.aggregate(filteredPipeline),
        Book.aggregate(countPipeline)
    ]);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    return { filteredBooks, totalCount };
};

const getBookById = async(bookId) => {
    const book = await Book.findById(bookId)
    if (!book)
            throw new Exception('Book not found')
    return book 
}

const getBookByMaSach = async(bookMNV) => {
    const book = await Book.findOne({ 'MaSach': bookMNV }).exec()
    if (!book)
            throw new Exception('Book not found')
    return book 
}

const addBook = async ({
    MaSach='', 
    TenAnh='', 
    TenSach='', 
    DonGia=1, 
    SoQuyen=1, 
    NamXuatBan=1900, 
    MaNXB= new ObjectId(), 
    TenTacGia='', 
}) => {
    const existingBook = await Book.findOne({ MaSach }).exec()
    if (!!existingBook) 
        throw new Exception(Exception.USER_EXIST)
    
    const existingPublisher = await Publisher.findById(MaNXB).exec()
    if (!existingPublisher) 
        throw new Exception('Nhà xuất bản không tồn tại')
    
    const book = await Book.create({
        MaSach, 
        TenAnh, 
        TenSach,
        DonGia,
        SoQuyen,
        NamXuatBan,
        MaNXB, 
        TenTacGia,
    })
    return book
}

const updateBook = async ({
    _id,
    MaSach, 
    TenAnh, 
    TenSach, 
    DonGia, 
    SoQuyen, 
    NamXuatBan, 
    MaNXB, 
    TenTacGia, 
}) => {  
    if (_id ){
        const book =  await Book.findById(_id)
        if (!book)
            throw new Exception('Không tìm thấy sách')
        if (MaSach && MaSach != book.MaSach){
            const num = await Book.countDocuments({ MaSach}).exec()
            if (num > 0)
                throw new Exception('Mã sách đã tồn tại')
        }
        if (MaNXB && MaNXB != book.MaNXB){
            const existingPublisher = await Publisher.findById(MaNXB).exec()
            if (!existingPublisher) 
                throw new Exception('Nhà xuất bản không tồn tại')
        }
        book.MaSach = MaSach ?? book.MaSach
        book.TenAnh = TenAnh ?? book.TenAnh
        book.TenSach = TenSach ?? book.TenSach
        book.DonGia = DonGia ?? book.DonGia
        book.SoQuyen = SoQuyen ?? book.SoQuyen
        book.NamXuatBan = NamXuatBan ?? book.NamXuatBan
        book.MaNXB = MaNXB ?? book.MaNXB
        book.TenTacGia = TenTacGia ?? book.TenTacGia
        await book.save()
        return book   
    }else {
        throw new Exception('Data must have id or MaSach')
    }
}

const deleteBook = async ({
    id,
    MaSach
}) => { 
    if (id || MaSach){ 
        let deletedBook = ''
        if (id){
            deletedBook = await Book.findByIdAndDelete(id)
        } else {
            let temp =  await Book.findOne({MaSach})
            deletedBook = await Book.findByIdAndDelete(temp._id)
        }
        if (!deletedBook)
            throw new Exception('Book not found')
        return deletedBook
    }else {
        throw new Exception('Data must have id or MaSach')
    }
}

export default {
    getAllBook,
    getBookById,
    getBookByMaSach,
    addBook,
    updateBook,
    deleteBook,
}