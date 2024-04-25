import axios from 'axios'
import store from '../store'
import app from '../main.js'

const url = process.env.API_URL

class StaffService {
    constructor() {
        this.baseUrl = `${url}/staff`
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

    async login(payload) {
        return (await this.api.post(`${this.baseUrl}/login`,payload)).data
    }

    async register(payload) {
        return (await this.api.post(`${this.baseUrl}/register`,payload)).data
    }

    async addStaff(payload) {
        return (await this.api.post(`${this.baseUrl}/register`,payload)).data
    }

    async updateStaff(payload) {
        return (await this.api.put(`${this.baseUrl}`,payload)).data
    }

    async getStaff(page = 1, size=10, searchString ='') {
        return (await this.api.get(`${this.baseUrl}/${app.$store.state.userData._id}?page=${page}&size=${size}&searchString=${searchString}`,{})).data
    }

    async deleteStaff(payload) {
        return (await this.api.delete(`${this.baseUrl}`,{ data: payload })).data
    }

}

export const staffService = new StaffService()
