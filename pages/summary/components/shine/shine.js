// pages/summary/components/shine/shine.js
import { td_event_summary } from '../../../../utils/talkingData-analysis/statistics.js'
const util = require('../../../../utils/util.js');
const app = getApp();
const request = require('../../../../utils/request')
const summaryApi = require('../../../../api/summary')
let hasPostStatics = false;//是否发送过页面展示埋点数据
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
    trophyNum: 0,
    isShowEvents: false
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
      
      keys.forEach(key => {
        if(derivedEventData[key]){
          derivedEventData.eventNumFlag.push(1)
          let timeStamp = data[key].time
          derivedEventData[key].time = util.formatTime(timeStamp)
        }
      })
      return derivedEventData
    },
    //获取奖杯总数
    getTrophyNum() {
      const token = app.globalData.access_token
      const params = {
        userId: this.properties.userId,
        level: this.properties.level,
        stage: this.properties.stage
      }
      summaryApi.getTrophyNum(params, token).then(res => {
        if(res.data.code === 200) {
          this.setData({
            trophyNum: res.data.data
          })
          if(res.data.data && !hasPostStatics) {
            td_event_summary({
              label: 'C0114',
              card_status: 'show'
            })
            hasPostStatics = true
          }
        }
      })
    },

    // 是否显示特殊事件
    getIsShowEvents(data) {
      const keys = Object.keys(data)
      return keys.some(key => {
        return data[key]
      })
    },
  },

  attached: function() {
    hasPostStatics = false
    this.getEventData().then(res => {
      if(res.data.code === 200) {
        const eventData = this.getDeriveEventData(res.data.data)
        const isShowEvents = this.getIsShowEvents(res.data.data)
        this.setData({
          eventData,
          isShowEvents
        })
        if(!hasPostStatics) {
          td_event_summary({
            label: 'C0114',
            card_status: 'show'
          })
          hasPostStatics = true
        }
      }
    })
    this.getTrophyNum()
  }
})
