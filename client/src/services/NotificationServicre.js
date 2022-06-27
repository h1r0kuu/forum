import axios from "axios"

const NOTIFICATION_API_RUL = "http://localhost:8080/api/v1/notifications"

class NotificationSevice {
    notify(data) {
        return axios.post(`${NOTIFICATION_API_RUL}/notify`, data)
    }
}

export default new NotificationSevice()