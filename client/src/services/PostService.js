import axios from "axios"
const POST_API_RUL = "http://localhost:8080/api/v1/posts"
class PostSevice {
    getOne(postId) {
        return axios.get(`${POST_API_RUL}/` + postId)
    }

    getPostsByForumId(forumId) {
        return axios.get(`${POST_API_RUL}/forum/` + forumId)
    }

    getAll(page) {
        return axios.get(`${POST_API_RUL}/all?page=${page}`)
    }

    create(data, callback) {
        axios.post(`${POST_API_RUL}/create`, data)
        .then((res) => {
            callback(res)
        })
    }

    like(postId, data) {
        axios.post(`${POST_API_RUL}/${postId}/like`, data)
    }

    dislike(postId, data) {
        axios.post(`${POST_API_RUL}/${postId}/dislike`, data)
    }
}

export default new PostSevice()