import mongoose from "mongoose"
import { Exception } from '../exceptions/index.js'
import { OutputType, print } from "../helpers/print.js"

async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URL)        
        print('Connect mongoose successfully', OutputType.SUCCESS)        
        return connection
    } catch (error) {                
        const {code} = error        
        if(error.code == 8000) {            
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        } else if(code == 'ENOTFOUND') {
            throw new Exception(Exception.WRONG_CONNECTION_STRING)
        }
        
        throw new Exception(Exception.CANNOT_CONNECT_MONGODB)
    }
}
export default connect
