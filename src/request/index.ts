import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const baseApiConfig = {
  baseURL: 'https://dummyjson.com',
  headers: {
    'content-type': 'application/json'
  },
  timeout: 60000 // 60s
}

const baseApiClient = axios.create(baseApiConfig)

const request = <T = any>({ ...options }: AxiosRequestConfig<any>) => {
  const onSuccess = (response: AxiosResponse<T, any>) => response
  const onError = (error: { response: { status: number } }) => {
    return Promise.reject(error.response)
  }

  return baseApiClient(options).then(onSuccess).catch(onError)
}

export default request
