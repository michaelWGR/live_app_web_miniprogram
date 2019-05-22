const request = require('../utils/request.js')

/** 请求权限 */
const authorize = (params) => {
  return request.post('/v1/applets/signature',params)
} 

/** 获取作品信息*/
const getWorkDetail = (params) => {
  return request.post('/v1/applets/commentInfo', params)
}

module.exports = {
  authorize,
  getWorkDetail
}