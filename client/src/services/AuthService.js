import axios from "axios"
import api,{API_URL} from "../utils/authQuery"

class AuthService {
    async login(username, password) {
        return axios.post(`${API_URL}/auth/login`, {username, password})
    }

    async registration(data) {
        return api.post(`${API_URL}/auth/registration`, data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
        })
    }

    async logout() {
        return api.post('/auth/logout')
    }

}

export default new AuthService()