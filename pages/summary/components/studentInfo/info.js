// pages/summary/components/studentInfo/info.js
import Wxml2Canvas from './../../../../utils/wxml2canvas.js'
const app = getApp();
const util = require('./../../../../utils/util.js');
const summaryApi = require('../../../../api/summary.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {
        nickname: '---'
      }
    },
    userId: {
      type: String,
      value: ''
    },
    levelStage: {
      type: Object,
      value: { level: '-', stage: '-' }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: {
      banner: util.img_baseUrl + 'summary-info-banner.png',
      arrow: util.img_baseUrl + 'summary-info-arrow.png',
      headImage: util.img_baseUrl + 'summary-info-headImage.png'
    },
    commitClassTime: {
      homeworkTotal: '-',
      stageHomeworkTotal: '-'
    },
    accumulativeTime: {
      totalTime: '-',
      nowStageTime: '-'
    },
    userInfo: null,
    erweima: ''
  },

  attached: function () {
    this.getCommitClassTime()
    this.getAccumulativeTime()
    // this.test123()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取作品数目
    getCommitClassTime() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.getCommitClassTime(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              commitClassTime: res.data.data
            })
            const detail = {
              homeworkTotal: res.data.data.homeworkTotal,
              stageHomeworkTotal: res.data.data.stageHomeworkTotal
            }
            this.triggerEvent('postData', detail)
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
    // 获取累积事件
    getAccumulativeTime() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.getAccumulativeTime(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              accumulativeTime: res.data.data
            })
            this.triggerEvent('postData', res.data.data)
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
    test123() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.test123(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              erweima: 'data:image/png;base64,' + res.data.data.qrbase64
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
    }
  }
})
