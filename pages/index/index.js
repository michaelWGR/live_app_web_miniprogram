// pages/index/index.js

const util = require('../../utils/util.js');
const api = require('../../api/api.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    img_baseUrl: util.img_baseUrl,
    homeworkList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getWorkList();
  },

  getWorkList: function () {
    const _this = this;
    api.getWorkList({}).then(res => {
      if (res.data.code == 0) {
        var list = res.data.data;
        _this.setData({
          homeworkList: list,
          loading: false
        })
      } else {
        wx.showToast({
          title: '服务器错误',
          icon: 'none',
          duration: 3000,
          complete: function () {
            wx.redirectTo({
              url: '/pages/unauth/unauth',
            })
          }
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 3000,
        complete: function () {
          wx.redirectTo({
            url: '/pages/unauth/unauth',
          })
        }
      })
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
    return {
      title: "画啦啦学员作品中心",
      imageUrl: ""
    }
  },
  /**查看学员作品 */
  routeToHomework: function(e){
    var homeworkId = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : null;
    wx.navigateTo({
      url: '/pages/homework/homework?homeworkId=' + homeworkId,
    })
  }
})