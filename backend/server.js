import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'
import {connect, seedingData} from './src/database/index.js'

app.listen(process.env.PORT, async() => {
    await connect()
    await seedingData()
    console.log(`Server is running on port ${process.env.PORT}.`)
})

