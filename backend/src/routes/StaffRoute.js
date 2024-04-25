import express from 'express'
import { body, validationResult } from 'express-validator'
import {StaffController} from '../controllers/index.js'
import {auth} from '../authentication/index.js'

const router = express.Router()

router.post('/login', 
    body('MSNV').trim().not().isEmpty().withMessage('Mã số nhân viên không được để trống'),
    body('Password').trim().isLength({ min: 5 }).withMessage('Mật khẩu tối thiểu năm kí tự'),
    StaffController.login)

router.post('/register', 
    body('MSNV').trim().not().isEmpty().withMessage('Mã số nhân viên không được để trống'),
    body('HoTenNV').trim().not().isEmpty().withMessage('Họ tên nhân viên không được để trống'),
    body('Password').trim().isLength({ min: 5 }).withMessage('Mật khẩu tối thiểu năm kí tự'),
    body('Chucvu').trim().not().isEmpty().withMessage('Chức vụ không được để trống'),
    body('SoDienThoai').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (!(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(value))) {
            throw new Error('Số điện thoại không đúng định dạng Việt Nam')
        }
        return true
    }).withMessage('Số điện thoại không đúng định dạng Việt Nam'),
    StaffController.addStaff)

router.get('/:id',auth, StaffController.getAllStaff)

router.get('/ById/:id',auth, StaffController.getStaffById)

router.get('/ByMSNV/:MSNV',auth, StaffController.getStaffByMSNV)

router.put('/',auth,
    body('Password').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (typeof value === 'string' && value.length < 6) {
            throw new Error('Mật khẩu tối thiểu năm kí tự')
        }
        return true
    }).withMessage('Mật khẩu tối thiểu năm kí tự'), 
    body('SoDienThoai').trim().custom((value, { req }) => {
        if (!value) {
            return true 
        }
        if (!(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(value))) {
            throw new Error('Số điện thoại không đúng định dạng Việt Nam')
        }
        return true
    }).withMessage('Số điện thoại không đúng định dạng Việt Nam'), 
    StaffController.updateStaff)

router.delete('/',auth, StaffController.deleteStaff)

export default router
