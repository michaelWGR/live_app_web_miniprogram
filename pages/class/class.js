// pages/class/class.js
const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../api/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    img_baseUrl: util.img_baseUrl,
    show_pop: false,
    homeworkId: null,
    courseData:{},
    scheduleList: [],
    scheduleSelIndex: 0,
    scheduleCourseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.homeworkId != undefined && options.homeworkId != '') {
      this.setData({ homeworkId: options.homeworkId });
    } else {
      this.setData({ homeworkId: null });
      wx.redirectTo({
        url: '/pages/unauth/unauth',
      });
      return;
    }

    const _this = this;

    if (app.globalData.access_token && app.globalData.access_token != '') {
      this.getClassWorkData(app.globalData.access_token);
    } else {
      app.tokenCallback = (token) => {
        if (token && token != '') {
          _this.getClassWorkData(token);
        }
      }
    }
  },

  /** -------------------事件处理函数--------------------- */
  /** 初始化 */
  getClassWorkData(token){
    const _this = this;
    api.getClassHomework({homeworkId:this.data.homeworkId},token)
      .then(res=>{
        if(res.data.code == 0){
          _this.setData({
            courseData: res.data.data,
            loading: false
          })
        }else{
          wx.showToast({
            title: '服务器错误',
            icon: 'none',
            duration: 3000,
            complete: function () {
              console.log(res.data.msg);
              wx.redirectTo({
                url: '/pages/unauth/unauth',
              })
            }
          })
        }
      }).catch(error=>{
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 3000,
          complete: function () {
            console.log(error)
            wx.redirectTo({
              url: '/pages/unauth/unauth',
            })
          }
        })
      })
  },

  /** 查看作品信息 */
  toHomeworkDetail:function(e){
    var homeworkId = e.currentTarget.dataset.id;
    if(homeworkId){
      wx.navigateTo({
        url: '/pages/homework/homework?homeworkId=' + homeworkId
      })
    }
  },

  /** 点赞 */
  praiseHandle:function(e){
    var homeworkId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    api.praiseHandle({ homeworkId: homeworkId }, app.globalData.access_token)
      .then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            var course = this.data.courseData;
            course.studentPaints[index].praiseFlag = 1;
            this.setData({
              courseData: course
            })
          }
        } else {
          wx.showToast({
            title: '点赞失败',
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(error => {
        console.log(error)
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 3000
        })
      })
  },

  /** 获取班级教学阶段 */
  getSchedule:function(){
    return new Promise((resolve,reject)=>{
      api.getCourseSchedule({ groupId: this.data.courseData.classInfo.classId }, app.globalData.access_token)
        .then(res => {
          if (res.data.code == 0) {
            this.setData({
              scheduleList: res.data.data,
              scheduleSelIndex: 0
            });
            resolve();
          } else {
            this.setData({
              scheduleList: [],
              scheduleSelIndex: 0
            });
            wx.showToast({
              title: '获取课程失败',
              icon: 'none',
              duration: 3000
            })
            reject(res);
          }
        })
        .catch(error => {
          reject(error);
        })

    })
  },

  /** 根据阶段获取课程列表 */
  getCourseBySchedule:function(){
    var params = {
      level: this.data.scheduleList[this.data.scheduleSelIndex].level,
      stage: this.data.scheduleList[this.data.scheduleSelIndex].stage,
      groupId: this.data.courseData.classInfo.classId
    }
    api.getCourseBySchedule(params, app.globalData.access_token)
      .then(res => {
        if(res.data.code==0){
          this.setData({
            scheduleCourseList: res.data.data,
            show_pop: true
          })
        }else{
          this.setData({
            scheduleCourseList: [],
            show_pop: true
          })
          wx.showToast({
            title: '获取课程失败',
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(error => {
        wx.showToast({
          title: '系统错误',
          icon: 'none',
          duration: 3000
        })
      })
  },

  /**关闭弹窗 */
  popClose:function(e){
    this.setData({
      show_pop: e.detail.show_pop
    })
  },
  /** 打开弹窗 */
  popOpen:function(){
    this.getSchedule().then(resolve=>{
      this.getCourseBySchedule();
    }).catch(error=>{
      console.log(error)
      wx.showToast({
        title: '请求错误',
        icon: 'none',
        duration: 3000
      })
    })
  },

  /** 切换阶段 */
  scheduleSwitch: function (e){
    this.setData({
      scheduleSelIndex: e.detail.index
    });
    this.getCourseBySchedule();
  },

  /** 选择课程 */
  selectCourse: function(e){
    this.setData({
      scheduleCourseId: e.detail.id
    });
  },

  /** 根据阶段课程获取画作 */
  getCourseList: function(e){
    var groupTableCourseId = e.detail.groupTableCourseId;
    var courseId = e.detail.courseId
    var name = e.detail.name;
    var _this = this;
    var params = {
      groupTableCourseInfoId: groupTableCourseId,
      courseInfoId: courseId,
      courseName: name
    }
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    api.getClassHomeworkByCourse(params,app.globalData.access_token)
       .then(res=>{
         wx.hideLoading({
           success: function () {
             if (res.data.code == 0) {
               _this.setData({
                 courseData: res.data.data,
                 show_pop: false
               })
             } else if (res.data.code == 810){
               wx.showToast({
                 title: '未找到该课程相关画作',
                 icon: 'none',
                 duration: 3000,
                 complete: function () {
                   console.log(res.data.msg);
                 }
               })

             }else {
               wx.showToast({
                 title: '服务器错误',
                 icon: 'none',
                 duration: 3000,
                 complete: function () {
                   console.log(res.data.msg);
                 }
               })
             }
           }
         }) 
       }).catch(error=>{
         wx.hideLoading({
           success: function(){
             wx.showToast({
               title: '网络错误',
               icon: 'none',
               duration: 3000,
               complete: function () {
                 console.log(error)
               }
             })
           }
         })
        
       });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})