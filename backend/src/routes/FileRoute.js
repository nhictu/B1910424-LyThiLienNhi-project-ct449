import express from 'express'
import { body, validationResult } from 'express-validator'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
        }
        cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype])
    }
})

const uploadAvatar = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif') {
            cb(null, true)
        } else {
            cb(null, false)
            req.fileError = 'File format is not valid'
        }
    }
 })

router.post('/', uploadAvatar.single('image'), (req, res) => {
    if (!req.file) 
        return res.status(200).json({code: 400, message: 'No file uploaded' })
    
    return res.status(200).json({
        code: 200,
        fileName: req.file.filename,
        filePath: `http://localhost:${process.env.PORT}/public/${req.file.filename}`
    })
})

export default router
