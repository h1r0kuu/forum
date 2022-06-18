import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/users"

class UserService {
    async getAll() {
        return axios.get(`${API_URL}/all`)
    }

    async getUser(username) {
        return axios.get(`${API_URL}/${username}`)
    }

    async follow(data) {
        axios.post(`${API_URL}/follow`, data)
    }

    async getUserPosts(username) {
        return axios.get(`${API_URL}/${username}/posts`)
    }
}

export default new UserService()