// components/coursePop/coursePop.js
const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../api/api.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    schedule: Array,
    scheduleSelIndex: Number,
    course: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    img_baseUrl: util.img_baseUrl,
    groupTableCourseId: '',
    courseId: '',
    courseName: '',
  },

  onload(){
    this.data.scheduleList;
    this.data.scheduleSelIndex;
    this.data.course;
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePop:function(){
      const eventDetail = {
        show_pop: false
      };
      const eventOption = {} // 触发事件的选项
      this.triggerEvent('handlePopClose', eventDetail, eventOption);
    },

    switchSchedule:function(e){
      var index = e.currentTarget.dataset.index;

      if(index!=this.data.scheduleSelIndex){
        const eventDetail = {
          index: index
        };
        const eventOption = {} // 触发事件的选项
        this.triggerEvent('handleScheduleSwitch', eventDetail, eventOption);
      }
    },

    selectCourse:function(e){
      var groupTableCourseId = e.currentTarget.dataset.grouptablecourseid;
      var courseId = e.currentTarget.dataset.courseid;
      var name = e.currentTarget.dataset.name;
      
      if (courseId == this.data.courseId && name == this.data.courseName && groupTableCourseId == this.data.groupTableCourseId) return;
      this.setData({
        groupTableCourseId: groupTableCourseId,
        courseId: courseId,
        courseName: name
      })
    },

    getCourseListDispatch:function(){
      if(this.data.courseId&&this.data.courseName){
        const eventDetail = {
          groupTableCourseId: this.data.groupTableCourseId,
          courseId: this.data.courseId,
          name: this.data.courseName
        };
        const eventOption = {} // 触发事件的选项
        this.triggerEvent('handleGetCourseList', eventDetail, eventOption);
      }else{
        wx.showToast({
          title: '请选择课程',
          icon: 'none',
          duration: 3000
        })
      }
      
    }

  }
})
