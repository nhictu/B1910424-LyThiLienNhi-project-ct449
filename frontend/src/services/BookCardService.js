import axios from 'axios'
import store from '../store'
import app from '../main.js'

const url = process.env.API_URL

class BookCardService {
    constructor() {
        this.baseUrl = `${url}/bookCard`
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
    }

    async addBookCard(payload) {
        return (await this.api.post(`${this.baseUrl}`,payload)).data
    }

    async updateBookCard(payload) {
        return (await this.api.put(`${this.baseUrl}`,payload)).data
    }

    async getBookCard(page = 1, size=10, searchString ='') {
        return (await this.api.get(`${this.baseUrl}?page=${page}&size=${size}&searchString=${searchString}`,{})).data
    }

    async deleteBookCard(payload) {
        return (await this.api.delete(`${this.baseUrl}`,{ data: payload })).data
    }

}

export const bookCardService = new BookCardService()
