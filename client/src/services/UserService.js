import axios from "axios"

import { USER_API_URL } from "../utils/urls"

export const UserService = {
    async getAll() {
        const {data} = await axios.get(`${USER_API_URL}/all`)
        return data
    },

    async getUser(username) {
        const {data} = await axios.get(`${USER_API_URL}/${username}`)
        return data
    },

    async follow(payload) {
        const {data} = await axios.post(`${USER_API_URL}/follow`, payload)
        return data
    },

    async unfollow(payload) {
        const {data} = await axios.post(`${USER_API_URL}/unfollow`, payload)
        return data
    },
    
    async getUserPosts(username, page=0, order="createdAt") {
        const {data} = await axios.get(`${USER_API_URL}/${username}/posts?page=${page}&order=${order}`)
        return data
    },

    async getUserComments(username) {
        const {data} = await axios.get(`${USER_API_URL}/${username}/comments`)
        return data
    },

    async getUserFollowingList(username) {
        const {data} = await axios.get(`${USER_API_URL}/${username}/following`)
        return data
    },

    async getUserFollowers(username) {
        const {data} = await axios.get(`${USER_API_URL}/${username}/followers`)
        return data
    },

    async getOnlineUsers() {
        const {data} = await axios.get(`${USER_API_URL}/online`)
        return data
    },

    async getUserHiddenPosts(username) {
        const {data} = await axios.get(`${USER_API_URL}/${username}/hidden_posts`)
        return data
    },
}