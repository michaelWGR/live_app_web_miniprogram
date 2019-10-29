// pages/pay-h5/pay-h5.js
const TRANSFER_CHANNEL = 2
const ENTRANCE_ID_KEY = 'adPosition';//入口id的key
const ENTER_FROM_ADVERTISEMENT = 3
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageUrl: `https://pay.61info.cn/experience/index.html?originUserId=${options.userId}&channel=STUDENT_CHANNEL&${ENTRANCE_ID_KEY}=${ENTER_FROM_ADVERTISEMENT}&stageStudyId=${options.reportId}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})