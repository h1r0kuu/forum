import axios from "axios"
import api from "../utils/authQuery"
import { IsAuth } from "../utils/UserUtil"

const POST_API_RUL = "http://localhost:8080/api/v1/posts"

class PostSevice {
    
    getOne(postId) {
        return api.get(`${POST_API_RUL}/` + postId)
    }

    getPostsByForumId(forumId, page=0, order="createdAt") {
        return api.get(`${POST_API_RUL}/forum/${forumId}/?page=${page}&order=${order}`)
    }

    getAll(page, order) {
        return api.get(`${POST_API_RUL}/all?page=${page}&order=${order}`)
    }
    
    create(data) {
        return axios.post(`${POST_API_RUL}/create`, data)
    }

    like(postId, data) {
        return axios.post(`${POST_API_RUL}/${postId}/like`, data)
    }

    dislike(postId, data) {
        return axios.post(`${POST_API_RUL}/${postId}/dislike`, data)
    }

    hidePost(postId) {
        return api.post(`${POST_API_RUL}/${postId}/hide`)
    }

    unHidePost(postId) {
        return api.post(`${POST_API_RUL}/${postId}/unhide`)
    }
}

export default new PostSevice()