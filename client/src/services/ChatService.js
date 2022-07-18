import axios from "../api/axios"

import { CHAT_API_URL } from "../utils/urls"

export const ChatService = {
    async create(payload) {
        const {data} = await axios.post(`${CHAT_API_URL}/create`, payload)
        return data
    },

    async getUserChats(username) {
        const {data} = await axios.get(`${CHAT_API_URL}/user/${username}`)
        return data
    },

    async getChatMessages(chatId, page) {
        const {data} = await axios.get(`${CHAT_API_URL}/${chatId}/messages?page=${page}`)
        return data
    },

    async sendMessage(payload) {
        const {data} = await axios.post(`${CHAT_API_URL}/sendMessage`, payload)
        return data
    },
}