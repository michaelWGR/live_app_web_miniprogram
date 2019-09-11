// pages/summary/components/audioDescription/audioDescription.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaying: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeAudioState: function() {
      this.setData({
        isPlaying: ! this.data.isPlaying
      })
    }
  }
})
