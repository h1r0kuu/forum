import axios from "../api/axios"

import { FORUMS_API_URL } from "../utils/urls"

export const ForumService = {
    async create(payload) {
        const {data} = await axios.post(`${FORUMS_API_URL}/create`, payload)
        return data
    },

    async getAllForums(subforums) {
        const {data} = await axios.get(`${FORUMS_API_URL}/all?subforums=${subforums}`)
        return data
    }
}