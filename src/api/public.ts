import axios from 'axios'
import { API_URL } from '../configs/envs'

const http = axios.create({
  baseURL: API_URL.PUBLIC,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

http.interceptors.request.use()
http.interceptors.response.use()

export default http
