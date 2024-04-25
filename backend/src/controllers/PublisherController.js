import { validationResult } from 'express-validator'
import { MAX_RECORDS } from '../Global/index.js'
import { HttpStatusCode } from '../exceptions/index.js'
import { PublisherRepo } from '../repositories/index.js'

async function getAllPublisher(req, res) {    
    //http:locahost: 3000?page=1&size=100
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    // size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let {filteredPublishers, totalCount} = await PublisherRepo.getAllPublisher({
            size, page, searchString
        })
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get publishers successfully',
            size: filteredPublishers.length,        
            page,
            searchString,
            totalCount,
            data: filteredPublishers,        
        })    
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

async function getPublisherById(req, res) {
    let publisherId = req.params.id
    try {
        const publisher = await PublisherRepo.getPublisherById(publisherId)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail publisher successfully',            
            data: publisher,        
        })  
    }catch(exception) {
         return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Nhà xuất bản không tồn tại' : exception.toString(),      
        })
    }
}

async function getPublisherByMaNXB(req, res) {
    let publisherMaNXB = req.params.MaNXB    
    try {
        const publisher = await PublisherRepo.getPublisherByMaNXB(publisherMaNXB)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail publisher successfully',            
            data: publisher,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

const addPublisher = async (req, res) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
                code : HttpStatusCode.BAD_REQUEST ,
                message:'',      
                errors: errors.array()  
            })
  
    try {
        const publisher = await PublisherRepo.addPublisher(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Add publisher successfully',
            data: publisher
        })
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString(),      
        })
    }
}

async function updatePublisher(req, res) { 
    try {
        const publisher = await PublisherRepo.updatePublisher(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Update publisher successfully',            
            data: publisher,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Nhà xuất bản không tồn tại' : exception.toString(),      
        })
    }
}

async function deletePublisher(req, res) {
    try {
        const publisher = await PublisherRepo.deletePublisher(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Deleted publisher successfully',            
            data: publisher,        
        })  
    }catch(exception) {
         return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Nhà xuất bản không tồn tại' : exception.toString(),      
        })
    }
}

export default {
    getAllPublisher,
    getPublisherById,
    getPublisherByMaNXB,
    addPublisher,
    updatePublisher,
    deletePublisher,
}