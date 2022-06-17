import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/forums"

class ForumService {
    create(data) {
        return axios.post(`${API_URL}/create`, data)
    }

    getAllForums() {
        return axios.get(`${API_URL}/all`)
    }
}

export default new ForumService()