export const API_URL = "http://localhost:8080/api/v1/"
export const WEBSOCKET_URL = "http://localhost:8080/ws"

export const POST_API_URL = API_URL + "posts"
export const FORUMS_API_URL = API_URL + "forums"
export const USER_API_URL = API_URL + "users"
export const NOTIFICATIONS_API_URL = API_URL + "notifications"
export const CHAT_API_URL = API_URL + "chats"
export const AUTH_API_URL = API_URL + "auth"
export const STATS_API_URL = API_URL + "stats"
export const SEARCH_API_URL = API_URL + "search"
export const IMAGE_API_URL = API_URL + "images"

export const MakeUrl = {
    userUrl(username) {
        return "/user/" + username
    },
    
    postUrl(postId) {
        return "/posts/" + postId
    },

    paginationUrl(page, order, direction) {
        return `?page=${page}&order=${order}&direction=${direction}`
    }
}