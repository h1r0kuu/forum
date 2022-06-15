import axios from "axios"

class ForumService {
    getAllForums() {
        return axios.get('http://localhost:8080/api/v1/forums/all')
    }
}

export default new ForumService()