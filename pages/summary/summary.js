// pages/summary/summary.js
const app = getApp();
const util = require('./../../utils/util.js');
const summaryApi = require('../../api/summary.js');
let scrollRatio = 0
let isGoOtherPage = false // 是否跳到其他页面了，如果是ture下次onShow不展示彩礼
let _enterTimestamp
let _shouldPostScanPage = false;//onShow的时候拿不到token和reportId,等拿到token再发送埋点
const TYPE_ENTER_SUMMARY = 1
const TYPE_SHARE_SUMMARY = 4
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: {
      welcome: util.img_baseUrl + 'summary-welcome.gif'
    },
    userInfo: null,
    levelStage: {
      level: '',
      stage: ''
    },
    isShowWelcome: false,
    userId: '',
    trophyNum: 0,
    pageHeight: 0,
    hasGetToken: false,
    teacherAvatar: '',
    reportId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const userId =  58661
    // const levelStage = {
    //   level: 1,
    //   stage: 1
    // }
    const paramsList = decodeURIComponent(options.scene).split('&')
    const userId = Number(paramsList[0])
    const levelStage = {
      level: Number(paramsList[1]),
      stage: Number(paramsList[2])
    }
    this.setData({
      userId,
      levelStage,
    })
    this.initToken(userId, levelStage)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(()=>{
      util.getPageHeight({id: '#summary', page: this}).then(res => {
        this.setData({
          pageHeight: res 
        })
      })
    }, 1000)
  },

  onShow: function () {
    _enterTimestamp = new Date().getTime()
    this.postScanPage()
    if (isGoOtherPage) {
      isGoOtherPage = false
    } else if (this.data.userInfo && this.data.userInfo.nickname) {
      this.initWelcome()
    }
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
    this.goToOtherPage()
    this.postShare()
    return {
      title: this.data.userInfo.nickname + '《Level ' + this.data.levelStage.level + ' stage ' + this.data.levelStage.stage + '》的画啦啦艺术成长报告'
    }
  },

  /**
   * 页面滚动的处理函数
   */
  onPageScroll: function(e) {
    scrollRatio = Math.ceil((e.scrollTop / this.data.pageHeight)*100)
  },

  // 判断是否存在token
  initToken(userId, levelStage) {
    const _this = this;
    const params = {
      userId: Number(userId),
      level: Number(levelStage.level),
      stage: Number(levelStage.stage)
    }
    if (app.globalData.access_token && app.globalData.access_token != '') {
      console.log('token: ' + app.globalData.access_token)
      _this.getUserInfo(userId, app.globalData.access_token)
      _this.getReportIdAndTeacherAvatar(params, app.globalData.access_token)
      _this.setData({
        hasGetToken: true
      })
    } else {
      app.tokenCallback = (token) => {
        if (token && token != '') {
          console.log('token: ' + token)
          _this.getUserInfo(userId, token)
          _this.getReportIdAndTeacherAvatar(params, token).then(reportId => {
            if(_shouldPostScanPage){
              summaryApi.postClickData(reportId, TYPE_ENTER_SUMMARY, app.globalData.access_token)
            }
          })
          _this.setData({
            hasGetToken: true
          })
        }
      }
    }
  },

  // 展示欢迎动画
  initWelcome() {
    const _this = this
    this.setData({
      isShowWelcome: true
    })
    setTimeout(function() {
      _this.setData({
        isShowWelcome: false
      })
    }, 1350)
  },

  // 获取用户信息 
  getUserInfo(userId, token) {
    const _this = this
    summaryApi.getUserInfo({ userId }, app.globalData.access_token)
      .then(res => {
        if (res.data.code === 200 || res.data.code === 0) {
          _this.setData({
            userInfo: res.data.data
          })
          _this.initWelcome()
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

  // 跳转到其他页面
  goToOtherPage() {
    isGoOtherPage = true
  },

  //获取报告id和老师头像
  getReportIdAndTeacherAvatar(params, token) {
    return new Promise((resolve, reject) => {
      const _this = this
      summaryApi.getTeacherComment(params, token).then(res => {
        if (res.data.code === 200 || res.data.code === 0) {
          _this.setData({
            teacherAvatar: res.data.data.headUrl,
            reportId: res.data.data.reportId
          })
          resolve(res.data.data.reportId)
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
    })
  },

  //浏览时长和滑动比例埋点
  postScaleData() {
    const leaveTimestamp = new Date().getTime()
    const time = leaveTimestamp - _enterTimestamp
    const scale = scrollRatio > 100 ? 100 : (scrollRatio < 0 ? 0 : scrollRatio)
    const data = {
      reportId: this.data.reportId,
      time: time,
      scale: scale,
      type: 1
    }
    summaryApi.postScaleData(data, app.globalData.access_token)
  },

  //进入报告埋点
  postScanPage() {
    if(app.globalData.access_token && app.globalData.access_token != '' && this.data.reportId) {
      const reportId = this.data.reportId
      summaryApi.postClickData(reportId, TYPE_ENTER_SUMMARY, app.globalData.access_token)
    }else{
      _shouldPostScanPage = true
    }
  },
  //分享埋点
  postShare() {
    if(app.globalData.access_token && app.globalData.access_token != '' && this.data.reportId) {
      const reportId = this.data.reportId
      summaryApi.postClickData(reportId, TYPE_SHARE_SUMMARY, app.globalData.access_token)
    }
  }
})