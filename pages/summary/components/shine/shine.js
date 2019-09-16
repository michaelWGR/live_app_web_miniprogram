// pages/summary/components/shine/shine.js
const util = require('../../../../utils/util.js');
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
    },
    trophyNum: {
      type: Number,
      value: 0
    },
    nickname: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currIndex: 0,
    isShowLikeModal: false,
    isShowCloseAnimation: false,
    praiseImg: util.img_baseUrl + 'praise.gif',
    eventData: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperSlide: function (e) {
      this.setData({
        currIndex: e.detail.current
      })
    },
    onClickLike: function () {
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
    getEventData: function() {
      const token = app.globalData.access_token
      return request.get('/v1/report/getSpecialEvent', {}, token)
    },
    getDeriveEventData: function(data) {
      const keys = Object.keys(data)
      const derivedEventData = { ...data }
      const hours = data.shortHomeworkCommitTimeDTO.commitTime / 3600000 
      const minutes = (data.shortHomeworkCommitTimeDTO.commitTime % 3600000)/60000
      derivedEventData.shortHomeworkCommitTimeDTO.commitTime = `${hours >= 1 ? (hours + '小时') : ''}${minutes >= 1 ? (minutes + '分钟') : ''}`
      keys.forEach(key => {
        derivedEventData[key].time = util.formatTime(data[key])
      })
      return derivedEventData
    }
  },

  attached: function() {
    this.getEventData().then(res => {
      if(res.data.code === 200) {
        const eventData = this.getDeriveEventData(res.data.data)
        this.setData({
          eventData
        })
      }
    })
  }
})
