import axios from 'axios'
import { Message } from 'element-ui'

const SUCCESS_CODE = 0

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
})

http.interceptors.request.use(
  config => config,
  error => {
    console.log(error)

    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  response => {
    const data = response.data

    if (data.code !== SUCCESS_CODE) {
      Message.error(data.message)

      return Promise.reject(new Error(data.message))
    }

    return data
  },
  error => {
    console.log(error)

    return Promise.reject(error)
  },
)

export default http
