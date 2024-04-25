import {HttpStatusCode} from '../exceptions/index.js'
import jwt from 'jsonwebtoken'
export default function checkToken(req, res, next) { 
    if(req.url.toLowerCase().trim() == '/staff/login'.toLowerCase().trim() 
        || req.url.toLowerCase().trim() == '/staff/register'.toLowerCase().trim()) {
            next()
        return
    }
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)        
        const isExpired = Date.now() >= jwtObject.exp * 1000

        if(isExpired) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired'
            })   
            res.end() 
        } else {
            next()
            return
        }        
    }catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }    
}