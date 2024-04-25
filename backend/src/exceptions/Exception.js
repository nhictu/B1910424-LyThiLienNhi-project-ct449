import { print, OutputType } from "../helpers/index.js"

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Tài khoản cơ sở dữ liệu sai"
    static WRONG_CONNECTION_STRING = "Chuỗi kết nói sai"
    static CANNOT_CONNECT_MONGODB = "Không thể kết nối đến cơ sở dữ liệu"    
    static USER_EXIST = "Id, mã số đã tồn tại"
    static CANNOT_REGISTER_USER = "Không thể đăng ký nhân viên"
    static WRONG_EMAIL_AND_PASSWORD = "Thông tin đăng nhập sai"

    constructor(message, validationErrors={}){
        super(message)
        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}