// pages/summary/components/audioDescription/audioDescription.js
let innerAudioContext = null
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioData: {
      type: String,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaying: false,
    duration: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeAudioState: function() {
      if(this.data.isPlaying){
        innerAudioContext.pause()
        this.setData({
          isPlaying: false
        })
      }else{

        innerAudioContext.play()
        this.setData({
          isPlaying: true
        })
      }
    },

    bindAudioEvent() {
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

      innerAudioContext.onTimeUpdate(e => {
        console.log('播放进度更新',e)
      })

      innerAudioContext.onEnded(() => {
        innerAudioContext.stop()
        this.setData({
          isPlaying: false,
          duration: innerAudioContext.duration
        })
      })

      innerAudioContext.onWaiting(() => {
        wx.showToast({
          title: '音频加载中...',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      })

      innerAudioContext.onCanplay(() => {
        wx.hideToast();
      })
    }
  },

  attached: function() {
    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = this.properties.audioData
    this.setData({
      duration: innerAudioContext.duration
    })
    this.bindAudioEvent()
  },

  detached: function() {
    innerAudioContext.offPlay()
    innerAudioContext.offTimeUpdate()
    innerAudioContext.offWaiting()
    innerAudioContext.offCanplay()
  },
})
