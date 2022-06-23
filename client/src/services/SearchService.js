import axios from "axios"

const SEARCH_API_RUL = "http://localhost:8080/api/v1/search"

class SearchSevice {
    search(query, page, order) {
        return axios.get(`${SEARCH_API_RUL}?query=${query}&page=${page}&order=${order}`)
    }
}

export default new SearchSevice()