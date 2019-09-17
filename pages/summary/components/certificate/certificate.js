// pages/summary/components/certificate/certificate.js
const util = require('../../../../utils/util.js');
const app = getApp();
const request = require('../../../../utils/request')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    levelStage: {
      type: Object,
      value: null
    },
    nickname: {
      type: String,
      value: ''
    },
    userId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTitle: function() {
      const token = app.globalData.access_token
      const params = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      request.get('/v1/report/getDiploma', params, token).then(res => {
        if(res.data.code === 200) {
          this.setData({
            title: res.data.data
          })
        }
      })
    }
  },

  attached: function() {
    this.getTitle()
  }
})
