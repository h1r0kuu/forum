import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/users"

class UserService {
    async getAll() {
        return axios.get(`${API_URL}/all`)
    }

    async getUser(username) {
        return axios.get(`${API_URL}/${username}`)
    }
}

export default new UserService()