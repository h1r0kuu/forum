import axios from "axios"

class PostSevice {
    getPostsByForumId(forumId) {
        return axios.get('http://localhost:8080/api/v1/posts/forum/' + forumId)
    }
}

export default new PostSevice()