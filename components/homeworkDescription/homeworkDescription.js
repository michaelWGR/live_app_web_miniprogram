// components/homeworkDescription/homeworkDescription.js
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
        this.innerAudioContext.pause()
        this.setData({
          isPlaying: false
        })
      }else{
        this.innerAudioContext.play()
        this.setData({
          isPlaying: true
        })
      }
    },
    onTimeUpdate(e) {
      let restTime = Math.floor(e.detail.duration - e.detail.currentTime)
      if(restTime < this.data.duration){
        this.setData({
          duration: restTime
        })
      }else if(restTime === 0) {
        this.onEnded()
      }
    },
    onEnded() {
      this.innerAudioContext.seek(0)
      this.innerAudioContext.pause()
      this.setData({
        isPlaying: false,
        duration: this.properties.audioData.duration
      })
    }
  },

  attached: function() {
    this.innerAudioContext = wx.createAudioContext('audio'+this.properties.audioData.id, this)
    this.setData({
      duration: this.properties.audioData.duration
    })
  }
})

