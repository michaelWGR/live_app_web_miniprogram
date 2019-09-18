// pages/summary/components/submitHomework/submitHomework.js
const util = require('../../../../utils/util.js')
const app = getApp();
const request = require('../../../../utils/request')
const summaryApi = require('../../../../api/summary.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: String,
      value: ''
    },
    level: {
      type: String,
      value: ''
    },
    stage: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rate: 1,
    homeworkList: [],
    homeworkCommitNum: 0,
    homeworkNoCommitNum: 0,
    teacherAvatar: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getHomeworkList: function() {
      const token = app.globalData.access_token
      const data = {
        userId: Number(this.properties.userId),
        level: Number(this.properties.level),
        stage: Number(this.properties.stage)
      }
      request.get('/v1/report/getHomeworkMessageByLevelStage', data, token).then(res => {
        if(res.data.code === 200) {
          const homework = res.data.data
          const allHomeworkNum = homework.homeworkCommitNum + homework.homeworkNoCommitNum
          this.setData({
            homeworkCommitNum: homework.homeworkCommitNum,
            homeworkNoCommitNum: homework.homeworkNoCommitNum,
            homeworkList: homework.homeworkStatusDTOs,
            rate: homework.homeworkCommitNum / allHomeworkNum
          })
        }
      })
    },
    getTeacherAvatar() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.level,
        stage: this.properties.stage
      }
      summaryApi.getTeacherComment(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              teacherAvatar: res.data.data.headUrl
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
  },

  attached: function() {
    this.getHomeworkList()
    this.getTeacherAvatar()
  }
})
