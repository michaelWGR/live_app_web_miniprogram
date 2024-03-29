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
    reportId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    qrCode: ''
  },

  attached: function() {
    this.initQrCode(this.properties.reportId)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initQrCode(reportId) {
      this.getQrcode(reportId).then(res => {
        if (res.data.code === 200) {
          this.setData({
            qrCode: 'data:image/png;base64,' + res.data.data
          })
          this.triggerEvent('postData', {
            qrCode: res.data.data
          })
        }
      })
    },
    getQrcode(reportId) {
      const params = {
        userId: this.properties.userId,
        reportId: reportId
      }
      return request.get('/v1/report/experienceCourseQrCode', params, '')
    }
  },
  observers: {
    'reportId': function (reportId) {
      if(reportId === -1) return false
      this.initQrCode(reportId)
    }
  }
})
