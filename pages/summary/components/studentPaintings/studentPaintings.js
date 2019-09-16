// pages/summary/components/studentPaintings/studentPaintings.js
const util = require('../../../../utils/util.js')
const app = getApp();
const request = require('../../../../utils/request')
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
    isShowLikeModal: false,
    isShowCloseAnimation: false,
    praiseImg: util.img_baseUrl + 'praise.gif',
    homeworkList: []
  },

  attached() {
    this.getHomeworkList().then(res => {
      if(res.data.code === 200) {
        const data = {...res.data.data}
        const level = Number(this.properties.level)
        const stage = Number(this.properties.stage)
        this.setData({
          homeworkList: this.getDeriveHomeworkList(data, level, stage)
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToCollections: function() {
      wx.navigateTo({
        url: '../../pages/collections/collections?userId=123&level=1&stage=1',
      })
    },
    onClickLike: function() {
      this.setData({
        isShowLikeModal: true
      })
      // 1s后执行动画，动画时长0.4s
      setTimeout(() => {
        this.setData({
          isShowCloseAnimation: true
        })
      }, 1000)
      // 动画执行完销毁节点
      setTimeout(() => {
        this.setData({
          isShowLikeModal: false,
          isShowCloseAnimation: false
        })
      }, 1400)
      const token = app.globalData.access_token
      const data = {
        userId: Number(this.properties.userId),
        level: Number(this.properties.level),
        stage: Number(this.properties.stage)
      }
      request.post('/v1/report/reportPraise', data, token)
    },

    getHomeworkList: function() {
      const params = {
        userId: Number(this.properties.userId),
        level: Number(this.properties.level),
        stage: Number(this.properties.stage)
      }
      return request.get('/v1/report/getHomeworks', params, app.globalData.access_token)
    },

    getDeriveHomeworkList(data, level, stage) {
      let homeworkList = data.map(item => {
        return {
          courseName: item.homeworkCommentForShareDTO.homework.courseName,
          level: level,
          stage: stage,
          imgUrl: item.homeworkCommentForShareDTO.comment.beautifiedImage.urlHost + item.homeworkCommentForShareDTO.comment.beautifiedImage.urlPath,
          audioDescriptions: item.homeworkCommentForShareDTO.homework.audioResources.map(audio => (audio.urlHost + audio.urlPath)),
          submitTime: util.formatTime(item.homeworkCommentForShareDTO.homework.submitTime, '.', true),
          courseOrder: item.sortCourse
        }
      })
      // 最多显示2个作业
      return homeworkList.length > 2 ? homeworkList.slice(0, 2) : homeworkList
    }
  }
})
