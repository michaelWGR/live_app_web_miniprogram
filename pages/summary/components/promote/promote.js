// pages/summary/components/promote/promote.js
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
      value: { level: '-', stage: '-' },
      observer: function (newVal, oldVal) {
        if (newVal.level !== oldVal.level) {
          this.getAbilityPromotion(newVal)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: {
      title: util.img_baseUrl + 'summary-promote-title.png',
      arrow: util.img_baseUrl + 'summary-info-arrow.png'
    },
    newAbilityNum: '-',
    allAbilityNum: '-',
    stageAlreadyAbilityNum: '-',
    currIndex: 0,
    levelStageSkillDTO: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperSlide: function (e) {
      this.setData({
        currIndex: e.detail.current
      })
    },

    getAbilityPromotion(option) {
      const _this = this
      const data = {
        level: option.level,
        stage: option.stage
      }
      summaryApi.getAbilityPromotion(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code == 0) {
            _this.setData({
              stageReportSchedule: res.data.data,
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
