import express from 'express'
import { body, validationResult } from 'express-validator'
import {ReaderController} from '../controllers/index.js'

const router = express.Router()

router.post('/', 
    body('MaDocGia').trim().not().isEmpty().withMessage('Mã số đọc giả không được để trống'),
    body('Ten').trim().not().isEmpty().withMessage('Tên đọc giả không được để trống'),
    body('Phai').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value != 'Nam' && value != 'Nữ') {
            throw new Error('Giới tính không hợp lệ')
        }
        return true
    }).withMessage('Giới tính không hợp lệ,Nam hoặc Nữ'),
    body('NgaySinh').trim().custom((value, { req }) => {
        if (!value) 
            return true 
        
        if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(value))) 
            throw new Error('Định dạng ngày sinh không hợp lệ')
        
        const parts = value.split('/') 
        const day = parseInt(parts[0], 10) 
        const month = parseInt(parts[1], 10) - 1
        const year = parseInt(parts[2], 10) 
        const birthDate = new Date(year, month, day)
        const now = new Date()
        const age = Math.floor((now - birthDate) / (365.25 * 24 * 60 * 60 * 1000))
        return age >= 18
    }).withMessage('Ngày sinh không hợp lệ, lớn hơn 18 tuổi'),
    body('DienThoai').trim().custom((value, { req }) => {
        if (!value) 
            return true 
        
        if (!(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(value))) 
            throw new Error('Số điện thoại không đúng định dang Việt Nam')
    
        return true
    }).withMessage('Số điện thoại không đúng định dang Việt Nam'),
    ReaderController.addReader)

router.get('/', ReaderController.getAllReader)

router.get('/ById/:id', ReaderController.getReaderById)

router.get('/ByMaDocGia/:MaDocGia', ReaderController.getReaderByMaDocGia)

router.put('/', 
    body('Phai').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value != 'Nam' && value != 'Nữ') {
            throw new Error('Giới tính không hợp lệ')
        }
        return true
    }).withMessage('Giới tính không hợp lệ,Nam hoặc Nữ'),
    body('NgaySinh').trim().custom((value, { req }) => {
        if (!value) 
            return true 
        
        if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(value))) 
            throw new Error('Định dạng ngày sinh không hợp lệ')
        
        const parts = value.split('/') 
        const day = parseInt(parts[0], 10) 
        const month = parseInt(parts[1], 10) - 1
        const year = parseInt(parts[2], 10) 
        const birthDate = new Date(year, month, day)
        const now = new Date()
        const age = Math.floor((now - birthDate) / (365.25 * 24 * 60 * 60 * 1000))
        return age >= 18
    }).withMessage('Ngày sinh không hợp lệ, lớn hơn 18 tuổi'),
    body('DienThoai').trim().custom((value, { req }) => {
        if (!value) 
            return true 
        
        if (!(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(value))) 
            throw new Error('Số điện thoại không đúng định dang Việt Nam')
    
        return true
    }).withMessage('Số điện thoại không đúng định dang Việt Nam'),
    ReaderController.updateReader)

router.delete('/', ReaderController.deleteReader)

export default router
