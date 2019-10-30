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
    },
    activeAudioId: {
      type: String,
      value: ''
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
        this.innerAudioContext.pause()
        this.setData({
          isPlaying: false
        })
      }else{
        this.triggerPlay()
        this.innerAudioContext.play()
        this.setData({
          isPlaying: true
        })
      }
    },

    bindAudioEvent() {
      this.innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

      this.innerAudioContext.onTimeUpdate(e => {
        this.setData({
          duration: Math.floor(this.innerAudioContext.duration - this.innerAudioContext.currentTime)
        })
      })

      this.innerAudioContext.onEnded(() => {
        this.innerAudioContext.stop()
        this.setData({
          isPlaying: false,
          duration: this.properties.audioData.duration
        })
      })

      this.innerAudioContext.onWaiting(() => {
        wx.showToast({
          title: '音频加载中...',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      })

      this.innerAudioContext.onCanplay(() => {
        wx.hideToast();
      })

      this.innerAudioContext.onError(err => {
        console.error(err)
        wx.showToast({
          title: '播放出错',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      })
    },
    triggerPlay() {
      const detail = {
        audioId: this.properties.audioData.id
      }
      this.triggerEvent('audioPlay', detail)
    },
    onOtherAudioPlay() {
      if(this.data.isPlaying){
        this.innerAudioContext.stop()
        this.setData({
          isPlaying: false,
          duration: this.properties.audioData.duration
        })
      }
    }
  },

  attached: function() {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = this.properties.audioData.url
    this.setData({
      duration: this.properties.audioData.duration
    }, () => {
      this.bindAudioEvent()
    })
  },

  detached: function() {
    this.innerAudioContext.offPlay()
    this.innerAudioContext.offTimeUpdate()
    this.innerAudioContext.offWaiting()
    this.innerAudioContext.offCanplay()
  },
  observers: {
    'activeAudioId': function(activeAudioId) {
      if(Number(activeAudioId) !== Number(this.properties.audioData.id)){
        this.onOtherAudioPlay()
      }
    }
  }
})
