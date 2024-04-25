import { validationResult } from 'express-validator'
import { MAX_RECORDS } from '../Global/index.js'
import { HttpStatusCode } from '../exceptions/index.js'
import { StaffRepo } from '../repositories/index.js'

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.BAD_REQUEST ,
            message:'',      
            errors: errors.array()  
        })

    const { MSNV, Password } = req.body
    try {
        let existingStaff = await StaffRepo.login({MSNV, Password})
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Login staff successfully',
            data: existingStaff
        })
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString(),      
        })
    }
}

async function getAllStaff(req, res) {    
    //http:locahost: 3000?page=1&size=100
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    // size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let {filteredStaffs, totalCount} = await StaffRepo.getAllStaff({
            size, page, searchString, id: req.params.id
        })

        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get staffs successfully',
            size: filteredStaffs.length,        
            page,
            searchString,
            totalCount,
            data: filteredStaffs,        
        })    
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

async function getStaffById(req, res) {
    let staffId = req.params.id
    try {
        const staff = await StaffRepo.getStaffById(staffId)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail staff successfully',            
            data: staff,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Nhân viên không tồn tại' : exception.toString(),      
        })
    }
}

async function getStaffByMSNV(req, res) {
    let staffMSNV = req.params.MSNV    
    try {
        const staff = await StaffRepo.getStaffByMSNV(staffMSNV)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Get detail staff successfully',            
            data: staff,        
        })  
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.message, 
        })
    }
}

const addStaff = async (req, res) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) 
       return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.BAD_REQUEST ,
            message:'',      
            errors: errors.array()  
        })
    try {
        const staff = await StaffRepo.addStaff(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Add staff successfully',
            data: staff
        })
    }catch(exception) {
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString(),      
        })
    }
}

async function updateStaff(req, res) { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
       return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.BAD_REQUEST ,
            message:'',      
            errors: errors.array()  
        })

    try {
        const staff = await StaffRepo.updateStaff(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Update staff successfully',            
            data: staff,        
        })  
    }catch(exception) {
         return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Nhân viên không tồn tại' : exception.toString(),      
        })
    }
}

async function deleteStaff(req, res) {
    try {
        const staff = await StaffRepo.deleteStaff(req.body)
        return res.status(HttpStatusCode.OK).json({
            code : HttpStatusCode.OK ,
            message: 'Deleted staff successfully',            
            data: staff,        
        })  
    }catch(exception) {
         return res.status(HttpStatusCode.OK).json({
            code :exception.toString().includes('CastError') ?   HttpStatusCode.NOT_FOUND : 
                HttpStatusCode.INTERNAL_SERVER_ERROR ,
            message: exception.toString().includes('CastError') ? 
                'Nhân viên không tồn tại' : exception.toString(),      
        })
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