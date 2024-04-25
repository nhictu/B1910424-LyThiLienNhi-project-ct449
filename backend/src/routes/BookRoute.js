import express from 'express'
import { body, validationResult } from 'express-validator'
import {BookController} from '../controllers/index.js'

const router = express.Router()

router.post('/', 
    body('MaSach').trim().not().isEmpty().withMessage('Mã sách không được để trống'),
    body('TenSach').trim().not().isEmpty().withMessage('Tên sách không được để trống'),
    body('DonGia').trim().isNumeric().withMessage('Đơn giá phải là số'),
    body('SoQuyen').trim().isNumeric().withMessage('Số lượng sách phải là số'),
    body('NamXuatBan').trim().isNumeric().withMessage('Năm xuất bản phải là số'),
    body('MaNXB').trim().not().isEmpty().withMessage('Nhà xuất bản không được để trống'),
    BookController.addBook)

router.get('/', BookController.getAllBook)

router.get('/ById/:id', BookController.getBookById)

router.get('/ByMaSach/:MaSach', BookController.getBookByMaSach)

router.put('/', 
    body('MaSach').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (typeof value != 'string') {
            throw new Error('Mã sách phải là chuỗi')
        }
        return true
    }).withMessage('Mã sách phải là chuỗi'),
    body('MaSach').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value.trim() == '') {
            throw new Error('Mã sách không được để rỗng')
        }
        return true
    }).withMessage('Mã sách không được để rỗng'),
    body('TenSach').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (typeof value != 'string') {
            throw new Error('Tên sách phải là chuỗi')
        }
        return true
    }).withMessage('Tên sách phải là chuỗi'),
    body('TenSach').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value.trim() == '') {
            throw new Error('Tên sách không được để rỗng')
        }
        return true
    }).withMessage('Tên sách không được để rỗng'),
    body('MaNXB').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (typeof value != 'string') {
            throw new Error('Mã nhà xuất bản phải là chuỗi')
        }
        return true
    }).withMessage('Mã nhà xuất bản phải là chuỗi'),
    body('MaNXB').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value.trim() == '') {
            throw new Error('Mã nhà xuất bản không được để rỗng')
        }
        return true
    }).withMessage('Mã nhà xuất bản không được để rỗng'),
    body('DonGia').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (isNaN(value)) {
            throw new Error('Đơn giá phải là số')
        }
        return true
    }).withMessage('Đơn giá phải là số'),
    body('SoQuyen').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (isNaN(value)) {
            throw new Error('Số lượng sách phải là số')
        }
        return true
    }).withMessage('Số lượng sách phải là số'),
    body('NamXuatBan').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (isNaN(value)) {
            throw new Error('Năm xuất bản sách phải là số')
        }
        return true
    }).withMessage('Năm xuất bản sách phải là số'),
    BookController.updateBook)

router.delete('/', BookController.deleteBook)

export default router
