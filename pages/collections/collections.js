// pages/collections/collections.js
const request = require('../../utils/request.js');
const util = require('./../../utils/util');
const app = getApp();
const summaryApi = require('../../api/summary.js');
let collectionScrollRatio = 0
let enterTimestamp
let shouldPostScanPage = false;//onShow的时候拿不到token和reportId,等拿到token再发送埋点
const TYPE_ENTER_COLLECTIONS = 3
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

  onShow: function() {
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
  onShareAppMessage: function () {
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
            summaryApi.postClickData(reportId, TYPE_ENTER_COLLECTIONS, token)
            shouldPostScanPage = false
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
          studentName: data[0].homeworkCommentForShareDTO.baseInfo.studentName,
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
        courseName: item.homeworkCommentForShareDTO.homework.courseName,
        level: level,
        stage: stage,
        imgUrl: item.homeworkCommentForShareDTO.comment.beautifiedImage.urlHost + item.homeworkCommentForShareDTO.comment.beautifiedImage.urlPath,
        audioDescriptions: item.homeworkCommentForShareDTO.homework.audioResources.map(audio => ({
          id: audio.id,
          url: audio.urlHost + audio.urlPath, 
          duration: audio.mediaLength, 
          stuAvatar: item.homeworkCommentForShareDTO.baseInfo.studentAvatar ? item.homeworkCommentForShareDTO.baseInfo.studentAvatar : util.img_baseUrl+'summary-info-headImage.png'
        })),
        submitTime: util.formatTime(item.homeworkCommentForShareDTO.homework.submitTime, '.', true),
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
    const data = {
      reportId: this.data.reportId,
      time: time,
      scale: scale,
      type: 2
    }
    summaryApi.postScaleData(data, app.globalData.access_token)
  },

  //进入页面埋点
  postScanPage() {
    if(app.globalData.access_token && app.globalData.access_token != '' && this.data.reportId) {
      const reportId = this.data.reportId
      summaryApi.postClickData(reportId, TYPE_ENTER_COLLECTIONS, app.globalData.access_token)
    }else{
      shouldPostScanPage = true
    }
  }
})