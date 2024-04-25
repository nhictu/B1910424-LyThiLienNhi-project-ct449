import { validationResult } from 'express-validator'
import { MAX_RECORDS } from '../Global/index.js'
import { HttpStatusCode } from '../exceptions/index.js'
import { ReaderRepo } from '../repositories/index.js'

async function getAllReader(req, res) {    
    //http:locahost: 3000?page=1&size=100
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    // size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let {filteredReaders, totalCount} = await ReaderRepo.getAllReader({
            size, page, searchString
        })
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get readers successfully',
            size: filteredReaders.length,        
            page,
            searchString,
            totalCount,
            data: filteredReaders,        
        })    
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

async function getReaderById(req, res) {
    let readerId = req.params.id
    try {
        const reader = await ReaderRepo.getReaderById(readerId)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail reader successfully',            
            data: reader,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Đọc giả không tồn tại' : exception.toString(),      
        })
    }
}

async function getReaderByMaDocGia(req, res) {
    let readerMaDocGia = req.params.MaDocGia    
    try {
        const reader = await ReaderRepo.getReaderByMaDocGia(readerMaDocGia)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail reader successfully',            
            data: reader,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

const addReader = async (req, res) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.BAD_REQUEST ,
            message:'',      
            errors: errors.array()  
        })
  
    try {
        const reader = await ReaderRepo.addReader(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Add reader successfully',
            data: reader
        })
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString(),      
        })
    }
}

async function updateReader(req, res) { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
                code : HttpStatusCode.BAD_REQUEST ,
                message:'',      
                errors: errors.array()  
            })
    try {
        const reader = await ReaderRepo.updateReader(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Update reader successfully',            
            data: reader,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Đọc giả không tồn tại' : exception.toString(),      
        })
    }
}

async function deleteReader(req, res) {
    try {
        const reader = await ReaderRepo.deleteReader(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Deleted reader successfully',            
            data: reader,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Đọc giả không tồn tại' : exception.toString(),      
        })
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