import axios from 'axios'
import store from '../store'
import app from '../main.js'

const url = process.env.API_URL

class BookService {
    constructor() {
        this.baseUrl = `${url}/book`
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        
        this.api.interceptors.request.use((config) => {
            const token = store.getters.token
			if ( token) 
				config.headers.authorization = `Bearer ${token}`
			return config
		})

		this.api.interceptors.response.use(
			(response) => {
				return response
			},
			(error) => {
				return error
			}
		)

        this.ImageApi = axios.create({
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        })

        this.ImageApi.interceptors.request.use((config) => {
            const token = store.getters.token
			if ( token) 
				config.headers.authorization = `Bearer ${token}`
			return config
		})

		this.ImageApi.interceptors.response.use(
			(response) => {
				return response
			},
			(error) => {
				return error
			}
		)

    }

    async uploadFile(payload) {
        return (await this.ImageApi.post(`${url}/upload`,payload)).data
    }

    async addBook(payload) {
        return (await this.api.post(`${this.baseUrl}`,payload)).data
    }

    async updateBook(payload) {
        return (await this.api.put(`${this.baseUrl}`,payload)).data
    }

    async getBook(page = 1, size=10, searchString ='') {
        return (await this.api.get(`${this.baseUrl}?page=${page}&size=${size}&searchString=${searchString}`,{})).data
    }

    async deleteBook(payload) {
        return (await this.api.delete(`${this.baseUrl}`,{ data: payload })).data
    }

}

export const bookService = new BookService()
