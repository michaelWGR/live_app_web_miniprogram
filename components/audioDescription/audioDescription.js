// pages/summary/components/audioDescription/audioDescription.js
let innerAudioContext = null
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
    },
    onPlay: function() {
      console.log('开始播放')
    },
    onTimeUpdate: function(e) {
      console.log('onTimeUpdate', e)
    }
  },

  attached() {
    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = ''
    innerAudioContext.onPlay(this.onPlay.bind(this))
    innerAudioContext.onTimeUpdate(this.onTimeUpdate.bind(this))
  },

  detached() {
    
  },
})
