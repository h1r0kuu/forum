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
    let originalRequest = error.config
    if(error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        if (error.response.status === 401 && localStorage.getItem("token") !== null) {
            console.log("HERE")
            try {
                const response = await axios.get(`${API_URL}/auth/refresh?token=${localStorage.getItem("token")}`)
                localStorage.setItem('token', response.data.token)
                return axios.request(originalRequest)
            } catch (e) {
                console.log(e)
            }
        } else if(error.response.status === 500) {
            delete originalRequest.headers['Authorization']
            localStorage.removeItem('token')
            return axios.request(originalRequest)
        } 
    }
    throw error
})

export default axios