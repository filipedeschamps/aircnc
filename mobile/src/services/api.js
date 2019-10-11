import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.71:3333'
})

export default api