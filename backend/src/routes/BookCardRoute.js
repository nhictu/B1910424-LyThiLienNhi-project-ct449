import express from 'express'
import { body, validationResult } from 'express-validator'
import {BookCardController} from '../controllers/index.js'

const router = express.Router()

router.post('/', 
    body('MaDocGia').trim().not().isEmpty().withMessage('Mã số đọc giả không được để trống'),
    body('MaSach').trim().not().isEmpty().withMessage('Mã số sách không được để trống'),
    body('NgayMuon').trim().custom((value, { req }) => {
        if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(value))) 
            throw new Error('Định dạng ngày mượn không hợp lệ')
        return true
    }).withMessage('Định dạng ngày mượn không hợp lệ (dd/MM/yyyy)'),
    BookCardController.addBookCard)

router.get('/', BookCardController.getAllBookCard)

router.get('/:id', BookCardController.getBookCardById)

router.put('/', 
    body('MaDocGia').trim().custom((value, { req }) => {
        if (value == '') {
            throw new Error('Mã đọc giả không được để rỗng')
        }
        return true
    }).withMessage('Mã đọc giả không được để rỗng'),
    body('MaSach').trim().custom((value, { req }) => {
        if (value == '') {
            throw new Error('Mã sách không được để rỗng')
        }
        return true
    }).withMessage('Mã sách không được để rỗng'),
    body('NgayMuon').custom((value, { req }) => {
        if (!value) 
            return true 
        if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(value))) 
            throw new Error('Định dạng ngày mượn không hợp lệ')
        return true
    }).withMessage('Định dạng ngày mượn không hợp lệ (dd/MM/yyyy)'),
    body('NgayMuon').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value.trim() == '') {
            throw new Error('Ngày mượn không được để rỗng')
        }
        return true
    }).withMessage('Mã sách không được để rỗng'),
    body('NgayTra').custom((value, { req }) => {
        if (!value) 
            return true 
        if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(value))) 
            throw new Error('Định dạng ngày trả không hợp lệ')
        return true
    }).withMessage('Định dạng ngày mượn không hợp lệ (dd/MM/yyyy)'),
    BookCardController.updateBookCard)

router.delete('/', BookCardController.deleteBookCard)

export default router
