import api from "../utils/authQuery"

class AuthService {
    async login(username, password) {
        return api.post('/auth/login', {username, password})
    }

    async registration(username, password) {
        return api.post('/auth/registration', {username, password})
    }

    async logout() {
        return api.post('/auth/logout')
    }

}

export default new AuthService()