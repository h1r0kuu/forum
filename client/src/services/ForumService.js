import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/forums"

class ForumService {
    create(data) {
        return axios.post(`${API_URL}/create`, data)
    }

    getAllForums(subforums) {
        return axios.get(`${API_URL}/all?subforums=${subforums}`)
    }
}

export default new ForumService()