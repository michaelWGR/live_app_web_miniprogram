// pages/summary/components/studentPaintings/studentPaintings.js
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
    isShowLikeModal: false
  },

  ready() {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToCollections: function() {
      wx.navigateTo({
        url: '../../pages/collections/collections',
      })
    },
    onClickLike: function() {
      this.setData({
        isShowLikeModal: true
      })
      setTimeout(() => {
        this.setData({
          isShowLikeModal: false
        })
      }, 2000)
    },
    closeModal: function() {
      this.setData({
        isShowLikeModal: false
      })
    }
  }
})
