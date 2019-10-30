// pages/summary/components/stage/stage.js
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
    image: {
      title: util.img_baseUrl + 'summary-stage-title.png',
      crown: util.img_baseUrl + 'summary-stage-crown.png',
      cloud: util.img_baseUrl + 'summary-stage-cloud.png'
    },
    isShowCardPop: false,
    showCardIndex: '',
    stageReportSchedule: [],
    isShowName: true
  },

  attached: function () {
    this.getStageReportSchedule()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCardPop(event) {
      if (this.data.isShowName) {
        this.setData({
          showCardIndex: event.currentTarget.dataset.text,
          isShowCardPop: true
        })
      }
    },

    hidePop() {
      this.setData({
        isShowCardPop: false
      })
    },

    getStageReportSchedule() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.getStageReportSchedule(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            var stageReportSchedule = res.data.data
            var isShowName = true
            if (stageReportSchedule.length < 4) {
              stageReportSchedule.push({})
              isShowName = false
            }
            _this.setData({
              stageReportSchedule: stageReportSchedule,
              isShowName: isShowName
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
    }
  }
})
