// components/audioMsg/audioMsg.js
const util = require('../../utils/util.js');

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
    current_play: {
      type: String,
      /**监听属性，如果当前播放的音频不为该组件的音频，则停止音频动画 */
      observer(newVal, oldVal){
        if (this.data.audio_id != this.data.current_play || this.data.current_play === '') {
          this.setData({
            is_play: false
          });
        }
      }
    },
    length: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_play: false,
    img_baseUrl: util.img_baseUrl
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.data.path;
      this.data.title;
      this.data.audio_id;
      this.data.current_play;
      this.data.length;
    },
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
        path:this.data.path,
        title:this.data.title,
        audio_id:this.data.audio_id
        } // detail对象，提供给事件监听函数
        const eventOption = {} // 触发事件的选项
        this.triggerEvent('handleAudioPlay', eventDetail, eventOption);
    }

  }
})
