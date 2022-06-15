import axios from "axios";
import { API_URL } from "../utils/axiosConf";
import AuthService from "./AuthService";
import {makeAutoObservable} from "mobx";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
            window.location.href = "/"
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(username, password) {
        try {
            const response = await AuthService.registration(username, password);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
            window.location.reload()
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth(token) {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/auth/refresh?token=${token}`)
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}