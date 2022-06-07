import axios from "axios"

class EmployeeService {
    getAllForums() {
        return axios.get('http://localhost:8080/api/v1/forums/all')
    }
}

export default new EmployeeService()