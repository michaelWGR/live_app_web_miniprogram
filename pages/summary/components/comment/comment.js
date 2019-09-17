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
      value: { level: '-', stage: '-' }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: {
      title: util.img_baseUrl + 'summary-comment-title.png',
      like: util.img_baseUrl + 'summary-comment-like-before.png',
      likeNo: util.img_baseUrl + 'summary-comment-like-before.png',
      likedOff: util.img_baseUrl + 'summary-comment-like-before-has.png',
      likeGif: util.img_baseUrl + 'summary-comment-like-after.gif'
    },
    comment: {
      artName: '---',
      headUrl: '',
      comment: '',
      flag: 0
    }
  },

  attached: function () {
    this.getTeacherComment()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTeacherComment() {
      const _this = this
      const data = {
        userId: this.properties.userId,
        level: this.properties.levelStage.level,
        stage: this.properties.levelStage.stage
      }
      summaryApi.getTeacherComment(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            _this.setData({
              comment: res.data.data
            })
            if (res.data.data.flag === 1) {
              let imageUrl = this.data.imageUrl;
              imageUrl.like = imageUrl.likedOff;

              this.setData({
                imageUrl: imageUrl
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
    },

    thankTeacher() {
      if (this.data.comment.flag === 0) {
        this.teacherPraise()
      } else {
        this.teacherCancelPraise()
      }
    },

    // 点赞老师评语
    teacherPraise() {
      const _this = this
      const data = {
        teacherCommentId: this.data.comment.reportId
      }
      summaryApi.teacherPraise(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            let imageUrl = this.data.imageUrl;
            imageUrl.like = imageUrl.likeGif;

            this.setData({
              imageUrl: imageUrl
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
    
    // 取消点赞老师评语
    teacherCancelPraise() {
      const _this = this
      const data = {
        teacherCommentId: this.data.comment.reportId
      }
      summaryApi.teacherCancelPraise(data, app.globalData.access_token)
        .then(res => {
          if (res.data.code === 200 || res.data.code === 0) {
            let imageUrl = this.data.imageUrl;
            imageUrl.like = imageUrl.likeNo;

            this.setData({
              imageUrl: imageUrl
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
