import { body, validationResult } from 'express-validator'
import {Exception, HttpStatusCode} from '../exceptions/index.js'
import { BookCardRepo } from '../repositories/index.js'
import {MAX_RECORDS} from '../Global/index.js'

async function getAllBookCard(req, res) {    
    //http:locahost: 3000?page=1&size=100
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let {filteredBookCards, totalCount} = await BookCardRepo.getAllBookCard({
            size, page, searchString
        })
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK,
            message: 'Get bookCards successfully',
            size: filteredBookCards.length,        
            page,
            totalCount,
            data: filteredBookCards,        
        })    
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: exception.message,       
        })  
    }
}

async function getBookCardById(req, res) {
    let bookCardId = req.params.id
    try {
        const bookCard = await BookCardRepo.getBookCardById(bookCardId)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail bookCard successfully',            
            data: bookCard,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Thẻ mượn không tồn tại' : exception.toString(),         
        })
    }
}

const addBookCard = async (req, res) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
                code : HttpStatusCode.BAD_REQUEST ,
                message:'',      
                errors: errors.array()  
            })
    try {
        const bookCard = await BookCardRepo.addBookCard(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK,
            message: 'Add bookCard successfully',
            data: bookCard
        })
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Sách, người đọc không tồn tại' : exception.toString(),         
        })
    }
}

async function updateBookCard(req, res) { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.BAD_REQUEST ,
            message:'',      
            errors: errors.array()  
        })
    try {
        console.log('vodssd');
        const bookCard = await BookCardRepo.updateBookCard(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Update bookCard successfully',            
            data: bookCard,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: exception.toString().includes('CastError') ? 
                'Phiếu mượn, Sách, người đọc không tồn tại' : exception.toString(),      
        })
    }
}

async function deleteBookCard(req, res) {
    try {
        const bookCard = await BookCardRepo.deleteBookCard({id:req.body._id})
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Deleted bookCard successfully',            
            data: bookCard,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: exception.toString().includes('CastError') ? 
                'Phiếu mượn không tồn tại' : exception.toString(),      
        })
    }
}

export default {
    getAllBookCard,
    getBookCardById,
    addBookCard,
    updateBookCard,
    deleteBookCard,
}