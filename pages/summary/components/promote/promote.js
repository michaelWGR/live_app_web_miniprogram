// pages/summary/components/promote/promote.js
import { td_event_summary } from '../../../../utils/talkingData-analysis/statistics.js'
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
      title: util.img_baseUrl + 'summary-promote-title.png',
      arrow: util.img_baseUrl + 'summary-info-arrow.png'
    },
    newAbilityNum: '-',
    allAbilityNum: '-',
    stageAlreadyAbilityNum: '-',
    currIndex: 0,
    levelStageSkillDTO: null
  },

  attached: function () {
    this.getAbilityPromotion()
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

    getAbilityPromotion() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.getAbilityPromotion(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              newAbilityNum: res.data.data.newAbilityNum,
              allAbilityNum: res.data.data.allAbilityNum,
              stageAlreadyAbilityNum: res.data.data.stageAlreadyAbilityNum,
              levelStageSkillDTO: res.data.data.levelStageSkillDTO
            })
            if(res.data.data.levelStageSkillDTO.levelStageSkillDetailList.length > 0){
              td_event_summary({
                label: 'C0106-显示能力提升',
                card_status: 'show'
              })
            }
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
