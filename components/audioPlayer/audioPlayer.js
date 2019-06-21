// components/audioPlayer/audioPlayer.js
const util = require('../../utils/util.js');
var timer = null;


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    audio_id: String,
    mediaLength: Number,
    current_time: {
      type: Number,
      observer(newVal, oldVal) {
          this.setData({
            current_time: Math.ceil(newVal),
            value: newVal,
          });  
      }
    },
    current_play: {
      type: Number,
      /**监听属性，如果当前播放的音频不为该组件的音频，则停止音频动画 */
      observer(newVal, oldVal) {
        if (this.data.audio.id == this.data.current_play && this.data.current_play!=0) {
          this.setData({
            is_play: true,
            disabled: true  //禁止用户在不播放当前作品故事录音时拖动进度条
          });
        } else {
          this.setData({
            is_play: false,
            disabled: false
          });
        }
      }
    },
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disabled: true,
    is_play: false,
    audio: null,
    audio_index: null,
    img_baseUrl: util.img_baseUrl,
    value: ''
  },

  onload(){
    this.data.path;
    this.data.title;
    this.data.audio_id;
    this.data.current_play;
    this.data.length;
    this.data.current_time;
    this.data.list;
  },
  ready(){
    this.setData({
      audio: this.data.list[0],
      audio_index: 0
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**进度控制 */
    timeSliderChanged: function(e){
      this.setData({
        is_play: true,
        current_time: Math.ceil(e.detail.value),
        value: e.detail.value
      });
      const eventDetail = {
        is_play: true,
        audio: this.data.audio,
        current: e.detail.value,
        audio_type: 1
      };
      const eventOption = {} // 触发事件的选项
      this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
      // this.audioPlay(this.data.audio.urlHost + this.data.audio.urlPath, this.data.audio.urlHost + this.data.audio.urlPath, e.detail.value);
    },

    /** 切换播放 */
    handleIndex: function(e){
      var index = e.currentTarget.dataset.index;
      if (this.data.audio.id == this.data.list[index].id) return;
      var audio = this.data.list[index];
      this.setData({
        is_play: true,
        audio: audio,
        audio_index: index
      });
      //播放
      const eventDetail = {
        is_play: true,
        audio: audio,
        current: 0,
        audio_type: 1
      };
      const eventOption = {} // 触发事件的选项
      this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
      // this.audioPlay(audio.urlHost + audio.urlPath, audio.urlHost + audio.urlPath, 0);
    },

    /**按钮控制播放 */
    handlePlay: function () {
      if (this.data.is_play) {
        //暂停
        this.setData({
          is_play: false
        });
      } else {
        //播放 or 重新播放
        this.setData({
          is_play: true
        });
      }
      var audio = this.data.audio;
      const eventDetail = {
        is_play: this.data.is_play,
        audio: audio,
        current: 0,
        audio_type: 1
      };
      const eventOption = {} // 触发事件的选项
      this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
    },

    /**前后切换播放 */
    handleSwitch(e){
      var handle = e.currentTarget.dataset.handle;
      var index = this.data.audio_index;
      if(handle == 'prev'){ //上一条
        if(index-1<0) return;
        this.setData({
          audio: this.data.list[index-1],
          audio_index: index-1
        });
        const eventDetail = {
          is_play: true,
          audio: this.data.audio,
          audio_type: 1
        };
        const eventOption = {} // 触发事件的选项
        this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
        // this.audioPlay(this.data.audio.urlHost + this.data.audio.urlPath, this.data.audio.urlHost + this.data.audio.urlPath, 0);

      } else if (handle == 'next'){ //下一条
      if(index+1>this.data.list.length-1) return;
        this.setData({
          audio: this.data.list[index + 1],
          audio_index: index + 1
        });
        const eventDetail = {
          is_play: true,
          audio: this.data.audio,
          audio_type: 1
        };
        const eventOption = {} // 触发事件的选项
        this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
        // this.audioPlay(this.data.audio.urlHost + this.data.audio.urlPath, this.data.audio.urlHost + this.data.audio.urlPath, 0);
      }
    },

    /** 音频播放 */
    audioPlay(title,src,start){
      this.setData({
        value: start
      });
      backgroundAudioManager.startTime = start;
      backgroundAudioManager.title = title;
      backgroundAudioManager.src = src;
    },

    setPlayStatus(status){
      this.setData({
        is_play: status
      })
    }

  }
})
