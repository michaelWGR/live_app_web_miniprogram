// components/painting/painting.js
const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    homeworkData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currIndex: 0,
    descriptions: [1, 2],
    activeAudioId: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperSlide: function(e) {
      this.setData({
        currIndex: e.detail.current
      })
    },
    onAudioPlay: function(e) {
      console.log('有音频播放', e.detail)
      this.setData({
        activeAudioId: e.detail.audioId
      })
    }
  }

})
