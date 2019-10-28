// pages/summary/summary.js
import Wxml2Canvas from './../../utils/wxml2canvas.js'
import generateCanvasData from '../../utils/generateCanvasData.js'
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
      welcome: util.img_baseUrl + 'summary-welcome.gif',
      save: util.img_baseUrl + 'save-report.png',
      weixin: util.img_baseUrl + 'weixin.png'
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
    canvasData: {},
    isShowCanvas: false,
    isBindingAcoount: true,
    progress: '',//报告保存进度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userId = 58661
    const levelStage = {
      level: 1,
      stage: 1
    }
    // const paramsList = decodeURIComponent(options.scene).split('&')
    // const userId = Number(paramsList[0])
    // const levelStage = {
    //   level: Number(paramsList[1]),
    //   stage: Number(paramsList[2])
    // }
    this.mergeCanvasData({
      level: levelStage.level,
      stage: levelStage.stage
    })
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
      _this.setIsBindingAccount(app.globalData.access_token)
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
          _this.setIsBindingAccount(token)
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
          this.mergeCanvasData({
            nickname: res.data.data.nickname,
            headUrl: res.data.data.headurl
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
          this.mergeCanvasData({
            teacherAvatar: res.data.data.headUrl,
            comment: res.data.data.comment,
            teacherName: res.data.data.artName
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
  },
  drawImage(img) {
    let self = this;
    this.drawImage1 = new Wxml2Canvas({
      obj: self,
      width: 750, // 宽， 以iphone6为基准，传具体数值，其他机型自动适配
      height: 5800, // 高
      element: 'canvas-summary',
      background: '#ffca32',
      progress(percent) {
        console.log(percent)
      },
      finish(url) {
        wx.saveImageToPhotosAlbum({
          filePath: url,
          success: function() {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功'
            })
          },
          fail: function() {
            wx.showToast({
              title: '保存失败'
            })
          }
        })
        self.setData({
          isShowCanvas: false
        })
      },
      error(res) {
        console.error(res)
      }
    });

    if (self.canvasData.qrCode){
      self.drawQrcode(self.canvasData.qrCode).then(qrCodePath => {
        let data = {
          list: generateCanvasData(self.canvasData, qrCodePath)
        }
        this.drawImage1.draw(data);
      })
    }else{
      //没有二维码则不必转换base64到本地临时路径
      let data = {
        list: generateCanvasData(self.canvasData)
      }
      this.drawImage1.draw(data);
    }
    
  },
  drawQrcode(base64Data) {
    return new Promise((resolve, reject) => {
      const filePath = `${wx.env.USER_DATA_PATH}/temp_image.png`;
      /// 将base64转为二进制数据
      const buffer = wx.base64ToArrayBuffer(base64Data);
      /// 绘制成图片
      wx.getFileSystemManager().writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
        success() {
          resolve(filePath)
        },
        fail() {
        }
      });
    })
    
  },
  receiveData(e) {
    this.mergeCanvasData(e.detail)
    console.log(this.canvasData)
  },
  mergeCanvasData(obj) {
    const tmp = {...this.canvasData, ...obj}
    this.canvasData = tmp
  },
  setReportToImg() {
    wx.showLoading({
      title: `保存中...`,
      mask: true
    })
    this.setData({
      isShowCanvas: true
    },() => {
      this.drawImage()
    })
  },
  setIsBindingAccount(token) {
    summaryApi.getBindingAccount({}, token).then(res => {
      if (res.data.code === 200) {
        this.setData({
          isBindingAcoount: res.data.data === 1 ? true : false
        })
      }
    })
  }
})