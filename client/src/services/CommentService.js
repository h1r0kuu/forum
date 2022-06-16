import axios from "axios"

const POST_API_RUL = "http://localhost:8080/api/v1/posts"

class CommentService {
    create(postId, data) {
        return axios.post(`${POST_API_RUL}/${postId}/comments/create`, data)
    }

    like(postId, commentId, data) {
        axios.post(`${POST_API_RUL}/${postId}/comments/${commentId}/like`, data)
    }

    dislike(postId, commentId, data) {
        axios.post(`${POST_API_RUL}/${postId}/comments/${commentId}/dislike`, data)
    }
}

export default new CommentService()