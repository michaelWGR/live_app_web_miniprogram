// pages/summary/components/studentPaintings/studentPaintings.js
const util = require('../../../../utils/util.js')
const app = getApp();
const request = require('../../../../utils/request')
const summaryApi = require('../../../../api/summary.js')
const TYPE_CLICK_GO_COLLECTIONS = 2
const HOMEWORK_NUM_TWO = 2;//本模块展示的作业数量，服务端返回，值只有1和2
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
    },
    reportId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowLikeModal: false,
    isShowCloseAnimation: false,
    praiseImg: util.img_baseUrl + 'praise.gif',
    homeworkList: [],
    submitNum: 0,
    navigationFlag: false
  },

  attached: function() {
    this.getHomeworkList().then(res => {
      if(res.data.code === 200 && res.data.data) {
        const data = res.data.data
        const level = Number(this.properties.level)
        const stage = Number(this.properties.stage)
        this.setData({
          submitNum: data.homeworkDTOS.length,
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
      this.postClick()
      this.setData({
        navigationFlag: true
      })
      this.triggerEvent('goToOtherPage')
      wx.navigateTo({
        url: `../../pages/collections/collections?userId=${this.properties.userId}&level=${this.properties.level}&stage=${this.properties.stage}&reportId=${this.properties.reportId}`,
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
      const params = util.qs(data)
      request.post('/v1/report/reportPraise' + params, {}, token)
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
      let homeworkList = data.homeworkDTOS.map(item => {
        return {
          courseName: item.courseName,
          level: level,
          stage: stage,
          imgUrl: item.homeworkResourseDTO.imgUrl,
          audioDescriptions: item.homeworkResourseDTO.userAudio.map(audio => ({
            id: audio.resourseId,
            url: audio.urlHost + audio.urlPath, 
            duration: audio.duration, 
            stuAvatar: item.homeworkResourseDTO.stuAvatar ? item.homeworkResourseDTO.stuAvatar : util.img_baseUrl+'summary-info-headImage.png'
          })),
          submitTime: util.formatTime(item.homeworkResourseDTO.submitTime, '.', true),
          courseOrder: item.sortCourse
        }
      })
      // 根据flag判断显示1个还是2个作业
      return data.homeworkDTOS.length > 1 && data.flag === HOMEWORK_NUM_TWO ? homeworkList.slice(0, 2) : homeworkList.slice(0, 1)
    },

    //埋点
    postClick() {
      const token = app.globalData.access_token
      summaryApi.postClickData(this.properties.reportId, TYPE_CLICK_GO_COLLECTIONS, token)
    }
  }
})
