import express from 'express'
import { body, validationResult } from 'express-validator'
import {PublisherController} from '../controllers/index.js'

const router = express.Router()

router.post('/', 
    body('MaNXB').trim().not().isEmpty().withMessage('Mã số nhà xuất bản không được để trống'),
    body('TenNXB').trim().not().isEmpty().withMessage('Tên nhà xuất bản không được để trống'),
    PublisherController.addPublisher)

router.get('/', PublisherController.getAllPublisher)

router.get('/ById/:id', PublisherController.getPublisherById)

router.get('/ByMaNXB/:MaNXB', PublisherController.getPublisherByMaNXB)

router.put('/', 
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
    body('TenNXB').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (typeof value != 'string') {
            throw new Error('Tên nhà xuất bản phải là chuỗi')
        }
        return true
    }).withMessage('Tên nhà xuất bản phải là chuỗi'),
    body('TenNXB').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (value.trim() == '') {
            throw new Error('Tên nhà xuất bản không được để rỗng')
        }
        return true
    }).withMessage('Tên nhà xuất bản không được để rỗng'),
    PublisherController.updatePublisher)

router.delete('/', PublisherController.deletePublisher)

export default router
