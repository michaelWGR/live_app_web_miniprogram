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
          qrCode: 'iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAACdklEQVR42u2aPZKDMAyFxaSg9BE4So4GR8tROAJlCgav9GSbEBC77c48Ghb7cwqt9eMnS/77swphwoQJEyZM+B/Cb7Hn8U769/bQr6e+cp5l3DAjhEO4UCm/pNOlw0vwlSdboy/CMTyLTcug42u/DFiTzM6wOuHfYRtfxSgdXWQfJHwP6/Rzsr05q3dLn2fCf4D3iIjnNXa5LA1DAeFDTpmrndvrJgER/nzUrd3AuVt1i5a9GZQ9hGFnTSZitctz6jyn6JNA9Mvpn0L4w846PfqaLMXJVwTGPcMQvoZtb7p325hgi8KtzbvxQ4QjGIVzzSKLmrvzRIMVx3RM+Nu7M6jXKNLbGpzh8NXiI+EARkSESX2plIhoqXokHMOuDizYkVijbp2QnLFTCcfw4DWyTSMiYm/qFnVzj4Rv4c1jYOdhcvNKJvJuwvupTVMuvDsXja9bQ+8m/FXJFDnPxpqBoVCl0zmF8DEwujTVjrid/4LIqX4mfNqiUAdqRBQ7w7XAKIRvYD+8eSVjMryd2nRN9XzCAQwBz0oYiAS9yyySkFrwRTiEyznN0of3gEapPaD3hbBA+AP2whkKVZGUPUx6ahHCEez+7IJoMXCjLkMB4YOkvFWFqno3qj8oy5lwDDdVb/IumitUbuCzLkr4WAS6VjBChjfv7j3RiHzlFMIXPaDSn619szTXL8IhXDqPuTR/aiOjpmPCN3Drd5tC1Vtd4+2zqRmfcATvFypKRET9DO9Op0qG8PmCij31xoC4uV1nJvwbbNOl81gMXAcJh3Dx7iHXSqZcFZDHlYhK+OJuT+tguFbg9xiji0CEeSmdMGHChAkTJpzXHxblctGBZ4l9AAAAAElFTkSuQmCC'
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
