// components/audioMsg/audioMsg.js
const util = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //组件ui长度是否由音频长度变化而变化
    auto_len: {
      type: Boolean,
      value: false
    },
    audio: {
      type: Object,
      value: null
    },
    path: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    audio_id: Number,
    current_play: {
      type: Number,
      /**监听属性，如果当前播放的音频不为该组件的音频，则停止音频动画 */
      observer(newVal, oldVal){
        if (this.data.audio.id == this.data.current_play) {
          this.setData({
            is_play: true
          });
        }else{
          this.setData({
            is_play: false
          });
        }
      }
    },
    text: String,
    length: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_play: false,
    img_baseUrl: util.img_baseUrl
  },

  onLoad() {
    this.data.auto_len;
    this.data.audio;
    this.data.path;
    this.data.title;
    this.data.audio_id;
    this.data.current_play;
    this.data.text;
    this.data.length;
  },

  ready(){
    var that = this;
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**播放控制 */
    handlePlay:function(){
      if(this.data.is_play){
        //暂停
        this.setData({
          is_play: false
        });
      }else{
        this.setData({
          is_play: true
        });
      }
      const eventDetail = {
        is_play:this.data.is_play,
        audio:this.data.audio,
        audio_type: 2
        } // detail对象，提供给事件监听函数
        const eventOption = {} // 触发事件的选项
        this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
    },
    setPlayStatus(status) {
      this.setData({
        is_play: status
      })
    }

  }
})
