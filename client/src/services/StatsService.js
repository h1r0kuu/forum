import axios from "axios"
import { STATS_API_URL } from "../utils/urls"


export const StatsService = {
    async stats() {
        const {data} = await axios.get(`${STATS_API_URL}`)
        return data
    }
}