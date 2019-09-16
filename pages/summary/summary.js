// pages/summary/summary.js
const app = getApp();
const util = require('./../../utils/util.js');
const summaryApi = require('../../api/summary.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: {
      welcome: util.img_baseUrl + 'summary-welcome.gif'
    },
    userInfo: {
      nickname: '---'
    },
    levelStage: {
      level: '-',
      stage: '-'
    },
    isShowWelcome: true,
    userId: '',
    trophyNum: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userId = { userId: options.userId ? options.userId : '' }
    this.setData({
      userId: userId.userId
    })
    this.initToken(userId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initWelcome()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.userInfo.nickname + '《Level ' + this.data.levelStage.level + ' stage ' + this.data.levelStage.stage + '》的画啦啦艺术成长报告'
    }
  },

  // 判断是否存在token
  initToken(userId) {
    const _this = this;
    if (app.globalData.access_token && app.globalData.access_token != '') {
      console.log('token: ' + app.globalData.access_token)
      _this.getUserInfo(userId, app.globalData.access_token)
      _this.getLevelStage(userId, app.globalData.access_token)
    } else {
      app.tokenCallback = (token) => {
        if (token && token != '') {
          console.log('token: ' + token)
          _this.getUserInfo(userId, token)
          _this.getLevelStage(userId, token)
        }
      }
    }
  },

  // 展示欢迎动画
  initWelcome() {
    const _this = this
    setTimeout(function() {
      _this.setData({
        isShowWelcome: false
      })
    }, 1800)
  },

  // 获取用户信息 
  getUserInfo(userId, token) {
    const _this = this
    summaryApi.getUserInfo(userId, token)
      .then(res => {
        if (res.data.code == 0) {
          _this.setData({
            userInfo: res.data.data
          })
        } else {
          wx.showToast({
            title: '服务器错误',
            icon: 'none',
            duration: 3000,
            complete: function () {
              console.log(res.data.msg);
            }
          })
        }
      }).catch(error => {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 3000,
          complete: function () {
            console.log(error)
          }
        })
      })
  },

  // 获取课程阶段
  getLevelStage(userId, token) {
    const _this = this
    summaryApi.getLevelStage(userId, token)
      .then(res => {
        if (res.data.code == 0) {
          _this.setData({
            levelStage: res.data.data
          })
        } else {
          wx.showToast({
            title: '服务器错误',
            icon: 'none',
            duration: 3000,
            complete: function () {
              console.log(res.data.msg);
            }
          })
        }
      }).catch(error => {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 3000,
          complete: function () {
            console.log(error)
          }
        })
      })
  },

  //获取奖杯总数
  getTrophyNum() {
    summaryApi.getTrophyNum(app.globalData.access_token).then(res => {
      if(res.data.code === 200) {
        this.setData({
          trophyNum: data
        })
      }
    })
  }
})