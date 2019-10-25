// pages/summary/components/bottomQrcode/bottomQrcode.js
const request = require('../../../../utils/request')
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    qrCode: ''
  },

  attached: function() {
    this.getQrcode().then(res => {
      if(res.data.code === 200) {
        this.setData({
          qrCode: 'data:image/png;base64,' + res.data.data
        })
        this.triggerEvent('postData', {
          qrCode: res.data.data
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getQrcode() {
      const params = {
        userId: this.properties.userId
      }
      return request.get('/v1/report/experienceCourseQrCode', params, app.globalData.access_token)
    }
  }
})
