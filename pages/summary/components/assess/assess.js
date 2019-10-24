// pages/summary/components/assess/assess.js
const app = getApp();
const util = require('./../../../../utils/util.js');
const summaryApi = require('../../../../api/summary.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: String,
      value: ''
    },
    levelStage: {
      type: Object,
      value: { level: '-', stage: '-' }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: {
      title: util.img_baseUrl + 'summary-assess-title.png',
      background0: util.img_baseUrl + 'summary-assess-bg0.png',
      background1: util.img_baseUrl + 'summary-assess-bg1.png',
      background2: util.img_baseUrl + 'summary-assess-bg2.png',
      scoreLeft: util.img_baseUrl + 'summary-assess-score-left.png',
      scoreMiddle: util.img_baseUrl + 'summary-assess-score-middle.png',
      scoreRight: util.img_baseUrl + 'summary-assess-score-right.png',
      backgroundLeft: util.img_baseUrl + 'summary-assess-left.png',
      backgroundRight: util.img_baseUrl + 'summary-assess-right.png',
      backgroundCloud: util.img_baseUrl + 'summary-assess-cloud.png',
      backgroundCloudLeft: util.img_baseUrl + 'summary-assess-cloud-left.png'
    },
    assessList: null
  },

  attached: function () {
    this.getSynthesisAbility()
  },

  methods: {
    getSynthesisAbility() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.getSynthesisAbility(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              assessList: res.data.data
            })
            this.triggerEvent('postData', {
              ability: res.data.data,
              analysis: this.initAssessList(res.data.data) + this.initAnalysis(res.data.data)
            })
          } else {
            wx.showToast({
              title: '服务器错误',
              icon: 'none',
              duration: 3000,
              complete: function () {
                console.log(res.data.msg);
              }
            })
          }
        }).catch(error => {
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 3000,
            complete: function () {
              console.log(error)
            }
          })
        })
    },
    initAnalysis(assessList) {
      const needPromoted = assessList.some(item => item.nowStageTime <= 3.5)
      return needPromoted ? '还有提升空间' : '各项能力均衡发展，继续保持'
    },
    initAssessList(assessList) {
      var needPromotedAssess = ''
      for (var i = 0; i < assessList.length; i++) {
        if (assessList[i].nowStageTime <= 3.5) {
          needPromotedAssess = needPromotedAssess + assessList[i].question + '、'
        }
      }

      if (needPromotedAssess) {
        return needPromotedAssess.substring(0, needPromotedAssess.length - 1)
      } else {
        return ''
      }
    }
  }
})
