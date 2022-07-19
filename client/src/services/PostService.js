import api from "../api/axios"
import axios from "../api/axios"

import { POST_API_URL } from "../utils/urls"

export const PostService = {
    async getOne(postId) {
        const {data} = await api.get(`${POST_API_URL}/` + postId)
        return data
    },

    async getPostsByForumId(forumId, page=0, order="createdAt") {
        const {data} = await api.get(`${POST_API_URL}/forum/${forumId}/?page=${page}&order=${order}`)
        return data
    },

    async getAll(page, order, direction, forum) {
        const {data} = await api.get(`${POST_API_URL}/all?page=${page}&order=${order}&direction=${direction}&forum=${forum}`)
        return data
    },
    
    async getRecentPosts() {
        const {data} = await axios.get(`${POST_API_URL}/recent`)
        return data
    },

    async create(payload) {
        const {data} = await axios.post(`${POST_API_URL}/create`, payload)
        return data
    },

    async like(postId, payload) {
        const {data} = await axios.post(`${POST_API_URL}/${postId}/like`, payload)
        return data
    },

    async dislike(postId, payload) {
        const {data} = await axios.post(`${POST_API_URL}/${postId}/dislike`, payload)
        return data
    },

    async hidePost(postId) {
        const {data} = await api.post(`${POST_API_URL}/${postId}/hide`)
        return data
    },

    async unHidePost(postId) {
        const {data} = await api.post(`${POST_API_URL}/${postId}/unhide`)
        return data
    },
}