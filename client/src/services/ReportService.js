import axios from "axios"

const REPORT_API_RUL = "http://localhost:8080/api/v1/reports"

class ReportSevice {

    create(data, callback) {
        axios.post(`${REPORT_API_RUL}/create`, data)
        .then((res) => {
            callback(res)
        })
    }

    getAll(entityType) {
        return axios.get(`${REPORT_API_RUL}/all?entity_type=${entityType || ''}`)
    }
}

export default new ReportSevice()