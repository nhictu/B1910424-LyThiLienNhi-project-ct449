import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import { StaffRoute, ReaderRoute, PublisherRoute, BookRoute, BookCardRoute, FileRoute } from './routes/index.js'
import {auth} from './authentication/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// app.use(auth)
app.use(cors())
app.use('/public', express.static(path.join(__dirname + '/../public/upload')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to library application' })
})

app.use('/upload', auth, FileRoute)
app.use('/staff', StaffRoute)
app.use('/reader', auth, ReaderRoute)
app.use('/publisher', auth, PublisherRoute)
app.use('/book', auth, BookRoute)
app.use('/bookCard', auth, BookCardRoute)

export default app
