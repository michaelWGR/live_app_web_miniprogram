// pages/collections/collections.js
import { td_event_collections, td_event } from '../../utils/talkingData-analysis/statistics.js'
const request = require('../../utils/request.js');
const util = require('./../../utils/util');
const app = getApp();
let collectionScrollRatio = 0
let enterTimestamp
let shouldPostScanPage = false;//onShow的时候拿不到openId,等拿到openId再发送埋点
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    level: 0,
    stage: 0,
    studentName: '',
    homeworkList: [],
    pageHeight: 0,
    reportId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {userId, level, stage, reportId} = { ...options }
    this.setData({
      userId: Number(userId),
      level: Number(level),
      stage: Number(stage),
      reportId: Number(reportId)
    })
    this.initToken(userId, level, stage, reportId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(()=>{
      util.getPageHeight({id: '#collections', page: this}).then(res => {
        this.setData({
          pageHeight: res 
        })
      })
    }, 500)
  },

  /**
   * 页面滚动的处理函数
   */
  onPageScroll: function(e) {
    collectionScrollRatio = Math.ceil((e.scrollTop / this.data.pageHeight)*100)
  },

  onShow: function(opt) {
    enterTimestamp = new Date().getTime()
    this.postScanPage()
  },

  onHide: function() {
    // 埋点
    this.postScaleData()
  },

  onUnload: function() {
    // 埋点
    this.postScaleData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (opts) {
    this.postShare(opts.from)
    const imgUrl = this.data.homeworkList.length > 0 && this.data.homeworkList[0].imgUrl ? this.data.homeworkList[0].imgUrl : ''
    return {
      title: `${this.data.studentName}《Level ${this.data.level} stage ${this.data.stage}》在画啦啦的创想作品集`,// 韩**《Level 1 stage 2》在画啦啦的创想作品集
      path: `/pages/collections/collections?userId=${this.data.userId}&level=${this.data.level}&stage=${this.data.stage}$reportId=${this.data.reportId}`,
      imageUrl: imgUrl// 截取页面中第一幅画作的内容
    }
  },

  // 判断是否存在token
  initToken(userId, level, stage, reportId) {
    const _this = this;
    if (app.globalData.access_token && app.globalData.access_token != '') {
      const params = {
        userId,
        level,
        stage,
        token: app.globalData.access_token
      }
      _this.getHomeworkList(params)
    } else {
      app.tokenCallback = (token) => {
        if (token && token != '') {
          _this.getHomeworkList(userId, level, stage, token)
          if(shouldPostScanPage) {
            _this.postScanPage()
          }
        }
      }
    }
  },

  getHomeworkList: function({userId, level, stage, token}) {
    const params = {userId, level, stage}
    request.get('/v1/report/getHomeworks', params, token).then(res => {
      if(res.data.code === 200){
        const data = res.data.data
        this.setData({
          studentName: data[0].homeworkResourseDTO.userName,
          homeworkList: this.getDeriveHomeworkList(data, level, stage)
        })
      }else{
        wx.showToast({
          title: `服务器错误${res.data.code}`,
          icon: 'none',
          duration: 3000
        })
      }
    }, err => {
      wx.showToast({
        title: `服务器错误${res.data.code}`,
        icon: 'none',
        duration: 3000
      })
    })
  },

  getDeriveHomeworkList(data, level, stage) {
    let homeworkList = data.map(item => {
      return {
        courseName: item.courseName,
        level: level,
        stage: stage,
        imgUrl: item.homeworkResourseDTO.imgUrl,
        audioDescriptions: item.homeworkResourseDTO.userAudio.map(audio => ({
          id: audio.resourseId,
          url: audio.host + audio.path, 
          duration: audio.duration, 
          stuAvatar: item.homeworkResourseDTO.stuAvatar ? item.homeworkResourseDTO.stuAvatar : util.img_baseUrl+'summary-info-headImage.png'
        })),
        submitTime: util.formatTime(item.homeworkResourseDTO.submitTime, '.', true),
        courseOrder: item.sortCourse
      }
    })
    return homeworkList
  },

  //浏览时长和滑动比例埋点
  postScaleData() {
    const leaveTimestamp = new Date().getTime()
    const time = leaveTimestamp - enterTimestamp
    const scale = collectionScrollRatio > 100 ? 100 : (collectionScrollRatio < 0 ? 0 : collectionScrollRatio)
    td_event_collections({
      label: 'C011202-页面停留时间',
      standing_time: time
    })
    td_event_collections({
      label: 'C011203-页面滑动占比',
      page_scale: scale + '%'
    })
  },

  //进入页面埋点
  postScanPage() {
    if(app.globalData.access_token && app.globalData.access_token != '') {
      td_event_collections({
        label: 'C011201-显示画作集',
        level: this.data.level,
        stage: this.data.stage,
      })
      shouldPostScanPage = false
    }else{
      shouldPostScanPage = true
    }
  },
  //分享埋点
  postShare(from) {
    td_event({
      id: 'C011204-画作集微信分享',
      label: 'C01120401-显示分享类型'
    })
    if(from === 'button') {
      td_event_collections({
        label: 'C011204-点击微信分享'
      })
    }else{
      td_event_collections({
        label: 'C011205-点击右上角分享'
      })
    }
  }
})