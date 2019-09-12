// pages/summary/components/studentPaintings/studentPaintings.js
const util = require('../../../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowLikeModal: false,
    isShowCloseAnimation: false,
    praiseImg: util.img_baseUrl + '/summary/praise.gif'
  },

  ready() {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToCollections: function() {
      wx.navigateTo({
        url: '../../pages/collections/collections?userId=123&level=1&stage=1',
      })
    },
    onClickLike: function() {
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
    }
  }
})
