import request from 'superagent'

const apiUrl = process.env.API_URL

export default {
  get (endpoint) {
    return this.request('get', endpoint)
  },

  post (endpoint, data) {
    return this.request('post', endpoint, data)
  },

  put (endpoint, data) {
    return this.request('put', endpoint, data)
  },

  del (endpoint, data) {
    return this.request('del', endpoint, data)
  },

  request (method, endpoint, data) {
    const url = `${apiUrl}${endpoint}`

    return new Promise((resolve, reject) => {
      const req = request[method](url)

      if (method === 'post' || method === 'put') {
        req.send(data)
      }

      req.end((_, res) => {
        if (res.status === 200) {
          resolve(res.body)
        } else {
          reject({
            message: res.text,
            status: res.status
          })
        }
      })
    })
  }
}
