const request = require('../utils/request.js')
const app = getApp();

/** 请求权限 */
const authorize = (params) => {
  return request.post('/v1/applets/signature',params)
} 

/**获取作品列表 */
const getWorkList = (params) => {
  if (wx.getStorageSync('access_token') && wx.getStorageSync('access_token') != '') {
    return request.post('/v1/applets/commentList', params)
  } else {
    app.tokenCallback = (token) => {
      if (token && token != '') {
        return request.post('/v1/applets/commentList', params)
      }

    }
  }
}

/** 获取作品信息*/
const getWorkDetail = (params) => {
  if (wx.getStorageSync('access_token') && wx.getStorageSync('access_token') != '') {
    return request.post('/v1/applets/commentInfo', params)
  } else {
    app.tokenCallback = (token) => {
      if (token && token != '') {
        return request.post('/v1/applets/commentInfo', params)
      }

    }
  }
}

module.exports = {
  authorize,
  getWorkList,
  getWorkDetail
}