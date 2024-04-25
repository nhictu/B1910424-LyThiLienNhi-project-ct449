import { validationResult } from 'express-validator'
import { MAX_RECORDS } from '../Global/index.js'
import { HttpStatusCode } from '../exceptions/index.js'
import { BookRepo } from '../repositories/index.js'

async function getAllBook(req, res) {    
    //http:locahost: 3000?page=1&size=100
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    // size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let {filteredBooks, totalCount} = await BookRepo.getAllBook({
            size, page, searchString
        })
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get books successfully',
            size: filteredBooks.length,        
            page,
            totalCount,
            searchString,
            data: filteredBooks,        
        })    
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

async function getBookById(req, res) {
    let bookId = req.params.id
    try {
        const book = await BookRepo.getBookById(bookId)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail book successfully',            
            data: book,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Sách không tồn tại' : exception.toString(),      
        })
    }
}

async function getBookByMaSach(req, res) {
    let bookMaSach = req.params.MaSach    
    try {
        const book = await BookRepo.getBookByMaSach(bookMaSach)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail book successfully',            
            data: book,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

const addBook = async (req, res) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
                code : HttpStatusCode.BAD_REQUEST ,
                message:'',      
                errors: errors.array()  
            })
  
    try {
        const book = await BookRepo.addBook(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Add book successfully',
            data: book
        })
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Mã nhà xuất bản không tồn tại' : exception.toString(),      
        })
    }
}

async function updateBook(req, res) { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.BAD_REQUEST ,
            message:'',      
            errors: errors.array()  
        })
    try {
        const book = await BookRepo.updateBook(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Update book successfully',            
            data: book,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Mã nhà xuất bản, sách không tồn tại' : exception.toString(),      
        })
    }
}

async function deleteBook(req, res) {
    try {
        const book = await BookRepo.deleteBook(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Deleted book successfully',            
            data: book,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Sách không tồn tại' : exception.toString(),      
        })
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