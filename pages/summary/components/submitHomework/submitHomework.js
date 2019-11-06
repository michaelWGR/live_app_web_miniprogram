// pages/summary/components/submitHomework/submitHomework.js
import { td_event_summary } from '../../../../utils/talkingData-analysis/statistics.js'
const util = require('../../../../utils/util.js')
const app = getApp();
const request = require('../../../../utils/request')
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
    level: {
      type: String,
      value: ''
    },
    stage: {
      type: String,
      value: ''
    },
    teacherAvatar: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rate: 1,
    homeworkList: [],
    homeworkCommitNum: 0,
    homeworkNoCommitNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getHomeworkList: function() {
      const token = app.globalData.access_token
      const data = {
        userId: Number(this.properties.userId),
        level: Number(this.properties.level),
        stage: Number(this.properties.stage)
      }
      request.get('/v1/report/getHomeworkMessageByLevelStage', data, token).then(res => {
        if(res.data.code === 200) {
          const homework = res.data.data
          const allHomeworkNum = homework.homeworkCommitNum + homework.homeworkNoCommitNum
          this.setData({
            homeworkCommitNum: homework.homeworkCommitNum,
            homeworkNoCommitNum: homework.homeworkNoCommitNum,
            homeworkList: homework.homeworkStatusDTOs,
            rate: homework.homeworkCommitNum / allHomeworkNum
          })
          if(allHomeworkNum > 0) {
            td_event_summary({
              label: 'C0110-显示画作提交',
              card_status: 'show'
            })
          }
        }
      })
    }
  },

  attached: function() {
    this.getHomeworkList()
  }
})
