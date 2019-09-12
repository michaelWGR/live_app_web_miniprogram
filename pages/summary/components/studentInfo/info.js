// pages/summary/components/studentInfo/info.js
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
      value: { nickname: '---', headurl: '' }
    },
    userId: {
      type: String,
      value: ''
    },
    levelStage: {
      type: Object,
      value: { level: '-', stage: '-' },
      observer: function (newVal, oldVal) {
        if (newVal.level !== oldVal.level) {
          this.getCommitClassTime(newVal)
          this.getAccumulativeTime(newVal)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: {
      banner: util.img_baseUrl + 'summary-info-banner.png',
      arrow: util.img_baseUrl + 'summary-info-arrow.png'
    },
    commitClassTime: {
      homeworkTotal: '-',
      stageHomeworkTotal: '-'
    },
    accumulativeTime: {
      totalTime: '-',
      nowStageTime: '-'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取作品数目
    getCommitClassTime(option) {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: option.level,
        stage: option.stage
      }
      summaryApi.getCommitClassTime(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code == 0) {
            _this.setData({
              commitClassTime: res.data.data
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
    // 获取累积事件
    getAccumulativeTime(option) {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: option.level,
        stage: option.stage
      }
      summaryApi.getCommitClassTime(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code == 0) {
            _this.setData({
              accumulativeTime: res.data.data
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
