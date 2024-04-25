import {BookCard, Reader, Book} from '../models/index.js'
import {Exception} from '../exceptions/index.js'
import mongoose  from 'mongoose'

const getAllBookCard = async ({
    page, 
    size,
    searchString='',
}) => {
    page = parseInt(page)
    size = parseInt(size)

    let filteredPipeline = [
        { 
            $lookup: {
                from: 'readers', 
                localField: 'MaDocGia', 
                foreignField: '_id', 
                pipeline: [
                    {
                        $match: {
                            $or: [
                                {
                                    HoLot: {$regex: `.*${searchString}.*`, $options: 'i'}
                                },
                                {
                                    Ten: {$regex: `.*${searchString}.*`, $options: 'i'}
                                },
                            ]
                        }
                    },
                ],
                as: 'temp1',
            }
        },
        { 
            $lookup: {
                from: 'readers', 
                localField: 'MaDocGia', 
                foreignField: '_id', 
                as: 'readerInfo',
            }
        },
        { 
            $lookup: {
                from: 'books', 
                localField: 'MaSach', 
                foreignField: '_id', 
                pipeline: [
                    {
                        $match: {
                            $or: [
                                {
                                    TenSach: {$regex: `.*${searchString}.*`, $options: 'i'}
                                },
                            ]
                        }
                    },
                ],
                as: 'temp2',
            }
        },
        { 
            $lookup: {
                from: 'books', 
                localField: 'MaSach', 
                foreignField: '_id', 
                as: 'bookInfo',
            }
        },
        { 
            $match: {
                $or: [
                    {
                        temp1: { $ne: [] } 
                    },
                    {
                        temp2: { $ne: [] } 
                    },
                ]
            }
        },
        {$skip: (page - 1) * size},
        {$limit: size},
    ]

    let countPipeline = [
        { 
            $lookup: {
                from: 'readers', 
                localField: 'MaDocGia', 
                foreignField: '_id', 
                pipeline: [
                    {
                        $match: {
                            $or: [
                                {
                                    HoLot: {$regex: `.*${searchString}.*`, $options: 'i'}
                                },
                                {
                                    Ten: {$regex: `.*${searchString}.*`, $options: 'i'}
                                },
                            ]
                        }
                    },
                ],
                as: 'temp1',
            }
        },
        { 
            $lookup: {
                from: 'readers', 
                localField: 'MaDocGia', 
                foreignField: '_id', 
                as: 'readerInfo',
            }
        },
        { 
            $lookup: {
                from: 'books', 
                localField: 'MaSach', 
                foreignField: '_id', 
                pipeline: [
                    {
                        $match: {
                            $or: [
                                {
                                    TenSach: {$regex: `.*${searchString}.*`, $options: 'i'}
                                },
                            ]
                        }
                    },
                ],
                as: 'temp2',
            }
        },
        { 
            $lookup: {
                from: 'books', 
                localField: 'MaSach', 
                foreignField: '_id', 
                as: 'bookInfo',
            }
        },
        { 
            $match: {
                $or: [
                    {
                        temp1: { $ne: [] } 
                    },
                    {
                        temp2: { $ne: [] } 
                    },
                ]
            }
        },
        { $count: "totalCount" }
    ]

    let [filteredBookCards, totalCount] = await Promise.all([
        BookCard.aggregate(filteredPipeline),
        BookCard.aggregate(countPipeline)
    ]);
    return {filteredBookCards, totalCount: totalCount.length > 0 ? totalCount[0].totalCount : 0}
}

const getBookCardById = async(bookCardId) => {
    const bookCard = await BookCard.findById(bookCardId)
    if (!bookCard)
            throw new Exception('BookCard not found')
    return bookCard 
}

const addBookCard = async ({
    MaDocGia=new ObjectId(), 
    MaSach=new ObjectId(), 
    NgayMuon= getCurrenDate(), 
    NgayTra, 
}) => {
    const existingReader = await Reader.findById(MaDocGia).exec()
    if (!existingReader) 
        throw new Exception('Độc giả không tồn tại')
    
    const existingBook = await Book.findById(MaSach).exec()
    if (!existingBook) 
        throw new Exception('Sách không tồn tại')

    if (NgayTra) {
        let ngayMuon = parseDateString(NgayMuon)
        let ngayTra = parseDateString(NgayTra)
        if(ngayMuon > ngayTra)
            throw new Exception('Ngày mượn phải nhỏ hơn hơn ngày trả')
    }
    let countBook = await BookCard.countDocuments({ MaSach: MaSach, NgayTra: '' }).exec()
    let quantityBook = existingBook.SoQuyen
    if (countBook+1 > quantityBook)
        throw new Exception('Sách đã mượn hết')
    const bookCard = await BookCard.create({
        MaDocGia, 
        MaSach, 
        NgayMuon,
        NgayTra,
    })
    return bookCard
}

const updateBookCard = async ({
    _id,
    MaDocGia, 
    MaSach, 
    NgayMuon, 
    NgayTra, 
}) => {  
    if (_id){
        const bookCard = await BookCard.findById(_id)
        if (!bookCard)
            throw new Exception('BookCard not found')
        if (MaDocGia && MaDocGia != bookCard.MaDocGia){
            const existingReader = await Reader.findById(MaDocGia).exec()
            if (!existingReader) 
                throw new Exception('Đọc giả không tồn tại')
        }
        if (MaSach && MaSach != bookCard.MaSach){
            const existingBook = await Book.findById(MaSach).exec()
            if (!existingBook) 
                throw new Exception('Sách không tồn tại')
        }

        bookCard.MaDocGia = MaDocGia ?? bookCard.MaDocGia
        bookCard.MaSach = MaSach ?? bookCard.MaSach
        bookCard.NgayMuon = NgayMuon ?? bookCard.NgayMuon
        bookCard.NgayTra = NgayTra ?? bookCard.NgayTra

        let ngayMuon = parseDateString(bookCard.NgayMuon)
        let ngayTra = parseDateString(bookCard.NgayTra)
        if(ngayTra != '' && ngayMuon > ngayTra)
            throw new Exception('Ngày mượn phải nhỏ hơn hơn ngày trả')
        await bookCard.save()
        return bookCard   
    }else {
        throw new Exception('Data must have id')
    }
}

const deleteBookCard = async ({
    id
}) => { 
    if (id){ 
        const deletedBookCard = await BookCard.findByIdAndDelete(id)
        if (!deletedBookCard)
            throw new Exception('BookCard not found')
        return deletedBookCard
    }else {
        throw new Exception('Data must have id or MaSach')
    }
}

export default {
    getAllBookCard,
    getBookCardById,
    addBookCard,
    updateBookCard,
    deleteBookCard,
}

const getCurrenDate = () => {
    const timestamp = Date.now()
    const dateObject = new Date(timestamp)

    const day = String(dateObject.getDate()).padStart(2, '0')
    const month = String(dateObject.getMonth() + 1).padStart(2, '0')
    const year = dateObject.getFullYear()

    const formattedDate = `${day}/${month}/${year}`

    return formattedDate
}

function parseDateString(dateString) {
    if(dateString == undefined || dateString == '')
        return ''
    const parts = dateString.split('/')
    return new Date(parts[2], parts[1] - 1, parts[0])
}