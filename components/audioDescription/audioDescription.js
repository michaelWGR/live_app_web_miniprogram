// pages/summary/components/audioDescription/audioDescription.js
// let innerAudioContext = null
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaying: false,
    duration: 0,
    innerAudioContext: null
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

    bindAudioEvent(innerAudioContext) {
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

      innerAudioContext.onTimeUpdate(e => {
        console.log('播放进度更新', innerAudioContext.currentTime)
        audioInterval = setInterval(() => {
          this.setData({
            duration: Math.ceil(innerAudioContext.currentTime)
          })
        }, 1000)
      })

      innerAudioContext.onEnded(() => {
        innerAudioContext.stop()
        clearInterval(audioInterval)
        this.setData({
          isPlaying: false,
          duration: this.properties.audioData.duration
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
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = this.properties.audioData.url
    this.setData({
      innerAudioContext,
      duration: this.properties.audioData.duration
    }, () => {
      this.bindAudioEvent(this.data.innerAudioContext)
    })
  },

  detached: function() {
    this.data.innerAudioContext.offPlay()
    this.data.innerAudioContext.offTimeUpdate()
    this.data.innerAudioContext.offWaiting()
    this.data.innerAudioContext.offCanplay()
  },
})
