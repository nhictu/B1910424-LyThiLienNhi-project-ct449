import axios from 'axios'
import store from '../store'
import app from '../main.js'

const url = process.env.API_URL

class ReaderService {
    constructor() {
        this.baseUrl = `${url}/reader`
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

    async addReader(payload) {
        return (await this.api.post(`${this.baseUrl}`,payload)).data
    }

    async updateReader(payload) {
        return (await this.api.put(`${this.baseUrl}`,payload)).data
    }

    async getReader(page = 1, size=10, searchString ='') {
        return (await this.api.get(`${this.baseUrl}?page=${page}&size=${size}&searchString=${searchString}`,{})).data
    }

    async deleteReader(payload) {
        return (await this.api.delete(`${this.baseUrl}`,{ data: payload })).data
    }

}

export const readerService = new ReaderService()
