import axios from "axios";
import {IMAGE_API_URL} from "../utils/urls";



export const ImageService = {
    async upload(payload) {
        const { data } = await axios.post(`${IMAGE_API_URL}/upload`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }
}