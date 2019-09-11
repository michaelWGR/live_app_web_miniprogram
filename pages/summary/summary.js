// pages/summary/summary.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: {
      welcome: 'http://10.10.117.199:3000/images/summary-welcome.gif'
    },
    name: '孔维浩',
    level: 1,
    stage: 1,
    isShowWelcome: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _this = this
    setTimeout(function(){
      _this.setData({
        isShowWelcome: false
      })
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;
    //请求数据
    if (app.globalData.access_token && app.globalData.access_token != '') {
      console.log('token: ' + app.globalData.access_token)
    } else {
      app.tokenCallback = (token) => {
        if (token && token != '') {
          console.log('token: ' + token)
        }
      }
    }
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
    return {
      title: this.data.name + '《Level ' + this.data.level + ' stage ' + this.data.stage + '》的画啦啦艺术成长报告'
    }
  }
})