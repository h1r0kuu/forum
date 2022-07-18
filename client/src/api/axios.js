import axios from 'axios';

import { IsAuth } from '../utils/authUser';

export const API_URL = `http://localhost:8080/api/v1`

axios.interceptors.request.use((config) => {
    if(localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    }
    return config
})

axios.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/auth/refresh?token=${localStorage.getItem("token")}`)
            localStorage.setItem('token', response.data.token)
            return axios.request(originalRequest)
        } catch (e) {
            console.log(e)
        }
    }
    throw error
})

export default axios