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
      type: Number,
      value: ''
    },
    level: {
      type: Number,
      value: ''
    },
    stage: {
      type: Number,
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
      const params = util.qs(data)
      request.post('/v1/report/reportPraise' + params, {}, token)
    },
    getEventData: function() {
      const token = app.globalData.access_token
      const params = {
        userId: this.properties.userId,
        level: this.properties.level,
        stage: this.properties.stage
      }
      return request.get('/v1/report/getSpecialEvent', params, token)
    },
    getDeriveEventData: function(data) {
      const keys = Object.keys(data)
      const eventNumFlag = []
      const derivedEventData = { ...data, eventNumFlag}
      if(data.shortHomeworkCommitTimeDTO){
        const hours = Math.floor(data.shortHomeworkCommitTimeDTO.commitTime / 3600000) 
        const minutes = Math.floor((data.shortHomeworkCommitTimeDTO.commitTime % 3600000)/60000)
        derivedEventData.shortHomeworkCommitTimeDTO.commitTime = `${hours >= 1 ? (hours + '小时') : ''}${minutes >= 1 ? (minutes + '分钟') : ''}`
      }
      if(data.mostAccessLiveRoomDTO) {
        const minuteTime = Math.ceil(Math.abs(data.shortHomeworkCommitTimeDTO.minuteTime) / 60)
        derivedEventData.mostAccessLiveRoomDTO.minuteTime = minuteTime
      }
      
      keys.forEach(key => {
        if(derivedEventData[key]){
          derivedEventData.eventNumFlag.push(1)
          let timeStamp = data[key]
          derivedEventData[key].time = util.formatTime(timeStamp)
        }
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
