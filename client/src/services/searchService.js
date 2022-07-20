import axios from "../api/axios"

import { SEARCH_API_URL } from "../utils/urls"

export const SearchService = {
    async search(query, page, order) {
        const {data} = await axios.get(`${SEARCH_API_URL}?query=${query}&page=${page}&order=${order}`)
        return data
    }
}