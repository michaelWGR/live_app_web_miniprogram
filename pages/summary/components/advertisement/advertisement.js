// pages/summary/components/advertisement/advertisement.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: String,
      value: ''
    },
    reportId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBuyCourse() {
      this.triggerEvent('goToBuy')
      wx.navigateTo({
        url: `../../pages/pay-h5/pay-h5?userId=${this.properties.userId}&reportId=${this.properties.reportId}`,
      })
    }
  }
})
