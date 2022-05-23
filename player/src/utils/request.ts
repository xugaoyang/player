import axios from 'axios'

let baseURL = 'http://localhost:3000'

const service = axios.create({
  baseURL,
  timeout: 15000,
})

service.interceptors.request.use(function (config) {

  return config
});

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  async error => {
                                
  }
)

export default service