import axios from "../api/axios"

import { NOTIFICATIONS_API_URL } from "../utils/urls"

export const NotificationSevice = {
    async getNotifications() {
        const {data} = await axios.get(`${NOTIFICATIONS_API_URL}/my`)
        return data
    }
}