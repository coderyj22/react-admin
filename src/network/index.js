import axios from 'axios'
import {message} from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? "http://rap2.taobao.org:38080/app/mock/249731" : ''
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    // authToken: window.localStorage.getItem('__authToken__')
    authToken: 'itisatoken'
  })
  return config
})


service.interceptors.response.use((resp) => {
  if (resp.status === 200) {
    return resp.data.data
  } else {
    // TODO 全局处理错误
    message.error(resp.data.errMsg)
  }
})

// 获取文章列表
export const getArticles = (offset, limited) => {
  return service.post('/api/v1/article', {
    offset,
    limited
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
}

// 通过id获取文章信息
export const getArticleById = (id) => {
  return service.post(`/api/v1/articleInfo/${id}`)
}

// 保存文章
export const saveArticle = (id,data) => {
  return service.post(`/api/v1/article/${id}`,data)
}
