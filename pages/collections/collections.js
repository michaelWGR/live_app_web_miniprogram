// pages/collections/collections.js
const request = require('../../utils/request.js');
const util = require('./../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    level: 0,
    stage: 0,
    studentName: '',
    homeworkList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {userId, level, stage} = { ...options }
    this.setData({
      userId: Number(userId),
      level: Number(level),
      stage: Number(stage)
    })
    console.log(userId, level, stage)
    this.getHomeworkList(userId, level, stage).then(res => {
      console.log(res)
      if(res.data.code === 200){
        const data = {...res.data.data}
        this.setData({
          studentName: data.baseInfo.studentName,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const imgUrl = this.data.homeworkList.length > 0 && this.data.homeworkList[0].imgUrl ? this.data.homeworkList[0].imgUrl : ''
    return {
      title: `${this.data.studentName}《Level ${this.data.level} stage ${this.data.stage}》在画啦啦的创想作品集`,// 韩**《Level 1 stage 2》在画啦啦的创想作品集
      path: `/pages/collections/collections?userId=${this.data.userId}&level=${this.data.level}&stage=${this.data.stage}`,
      imageUrl: imgUrl// 截取页面中第一幅画作的内容
    }
  },

  getHomeworkList: function(userId, level, stage) {
    const params = {userId, level, stage}
    return request.get('/v1/report/getHomeworks', params, app.globalData.access_token)
  },

  getDeriveHomeworkList(data, level, stage) {
    let homeworkList = data.map(item => {
      return {
        courseName: item.homework.courseName,
        level: level,
        stage: stage,
        imgUrl: item.comment.beautifiedImage.urlHost + item.comment.beautifiedImage.urlPath,
        audioDescriptions: item.homework.audioResources.map(audio => (audio.urlHost + audio.urlPath)),
        submitTime: util.formatTime(item.homework.submitTime, '.', true)
      }
    })
    return homeworkList
  }
})