import api from "../utils/authQuery"

const API_URL = "http://localhost:8080/api/v1/chats"

class ChatService {
    create(data) {
        return api.post(`${API_URL}/create`, data)
    }

    getUserChats(username) {
        return api.get(`${API_URL}/user/${username}`)
    }

    sendMessage(data) {
        return api.post(`${API_URL}/sendMessage`, data)
    }
}

export default new ChatService()