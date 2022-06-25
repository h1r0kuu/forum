import axios from "axios"

const STATS_API_RUL = "http://localhost:8080/api/v1/stats"

class StatsSevice {
    stats() {
        return axios.get(`${STATS_API_RUL}`)
    }
}

export default new StatsSevice()