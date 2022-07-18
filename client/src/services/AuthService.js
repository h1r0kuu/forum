import axios from "../api/axios"

import { AUTH_API_URL } from "../utils/urls"

export const AuthService = {
    async login(username, password) {
        const {data} = await axios.post(`${AUTH_API_URL}/login`, {username, password})
        return data
    },

    async registration(payload) {
        const {data} = await axios.post(`${AUTH_API_URL}/registration`, payload, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
        })
        return data
    },

    async logout() {
        const {data} = axios.post(`${AUTH_API_URL}/logout`)
        return data
    },

    async checkToken(token) {
        const {data} = await axios.get(`${AUTH_API_URL}/refresh?token=${token}`)
        return data
    }
}