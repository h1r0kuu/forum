import api from "../utils/authQuery"

class AuthService {
    async login(username, password) {
        return api.post('/auth/login', {username, password})
    }

    async registration(data) {
        return api.post('/auth/registration', data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }

    async logout() {
        return api.post('/auth/logout')
    }

}

export default new AuthService()