const util = require('../utils/util.js');

const BASE_URL = util.baseUrl;

//添加finally：参数里面complete方法。
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

/**封装promise GET方法 */
const get = (url, data = {}) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: BASE_URL + url,
      data: data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('access_token')
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

/**封装promise POST方法 */
const post = (url, data = {}) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('access_token')
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject(e);
      }
    })
  });
  return promise;
}

module.exports = {
  get,
  post
}