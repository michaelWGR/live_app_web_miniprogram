// pages/summary/components/comment/comment.js
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
          this.getTeacherComment(newVal)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: {
      title: util.img_baseUrl + 'summary-comment-title.png',
      like: util.img_baseUrl + 'summary-comment-like-before.png'
    },
    comment: {
      artName: '---',
      headUrl: '',
      comment: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    thankTeacher() {
      var imageUrl = this.data.imageUrl;
      imageUrl.like = 'http://10.10.117.199:3000/images/summary-comment-like-after.gif';

      this.setData({
        imageUrl: imageUrl
      })
    },

    getTeacherComment(option) {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: option.level,
        stage: option.stage
      }
      summaryApi.getTeacherComment(data, app.globalData.access_token)
      .then(res => {
        if (res.data.code == 0) {
          _this.setData({
            comment: res.data.data
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

    teacherPraise() {
      
    }
  }
})
