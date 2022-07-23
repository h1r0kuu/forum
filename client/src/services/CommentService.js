import axios from "../api/axios"

import { POST_API_URL } from "../utils/urls"

export const CommentService = {
    async create(postId, payload) {
        const {data} = await axios.post(`${POST_API_URL}/${postId}/comments`, payload)
        return data
    },

    async like(commentId, payload) {
        const {data} = await axios.post(`${POST_API_URL}/comments/${commentId}/like`, payload)
        return data
    },

    async dislike(commentId, payload) {
        const {data} = await axios.post(`${POST_API_URL}/comments/${commentId}/dislike`, payload)
        return data
    }
}