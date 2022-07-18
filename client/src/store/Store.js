import {AuthService} from "../services/authService"
import {makeAutoObservable} from "mobx"

class Store {
    user = {}
    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
    }

    async setAuth(bool) {
        this.isAuth = bool
    }

    async setUser(user) {
        this.user = user
    }

    async setLoading(bool) {
        this.isLoading = bool
    }

    async login(username, password) {
        try {
            AuthService.login(username, password).then(data => {
                localStorage.setItem('token', data.token)
                this.setAuth(true)
                this.setUser(data.user)
            }).finally(() => {
                window.location.href = "/"
            })
        } catch (e) {
            console.log(e)
            console.log(e.response?.data?.message)
        }
    }

    async registration(username, password) {
        try {
            AuthService.registration(username, password).then(data => {
                localStorage.setItem('token', data.token)
                this.setAuth(true)
                this.setUser(data.user)
            }).finally(() => {
                window.location.href = "/"
            })
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            AuthService.logout().then(() => {
                localStorage.removeItem('token')
                this.setAuth(false)
                this.setUser({})
            }).finally(() => {
                window.location.reload()
            })
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth(token) {
        this.setLoading(true)
        try {
            AuthService.checkToken(token).then(data => {
                localStorage.setItem('token', data.token)
                this.setAuth(true)
                this.setUser(data.user)
            })
        } catch (e) {
            console.log(e)
            if(e.response.data.status_code === 401) {
                localStorage.removeItem('token')
                this.setAuth(false)
                this.setUser({})
            }
        } finally {
            this.setLoading(false)
        }
    }
}

export default Store