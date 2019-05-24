//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const backgroundAudioManager = wx.getBackgroundAudioManager();
const api = require('../../api/api.js');

Page({
  data: {
    loading: true,
    comment_status: '0',
    is_playing: false,
    homework: {},
    current_play: '',
    currentTime: 0,
    homeworkId: null,
    img_baseUrl: util.img_baseUrl,
    top_left_radius: '0',
    top_right_radius: '18rpx',
    teacherCommentNormalStyle: 'border-top-left-radius:0;border-left: 0;box-shadow: 2rpx 0 6rpx rgb(236, 206, 135) inset;',
    homeworkStoryNormalStyle: 'border-top-right-radius:0;border-right: 0;box-shadow: -2rpx 0 6rpx rgb(236, 206, 135) inset;'
  },
  //事件处理函数
  audioPlay:function(e){
    if(e.detail.is_play){
      if (e.detail.audio_id === this.data.current_play){
        //重新播放
        backgroundAudioManager.startTime = this.data.currentTime;
        backgroundAudioManager.title = e.detail.title;
        // backgroundAudioManager.play();
      }else{
        //播放新音频
        this.setData({
          currentTime: 0
        })
        backgroundAudioManager.title = e.detail.title;
        backgroundAudioManager.src = e.detail.path;
        backgroundAudioManager.startTime = 0;
        // backgroundAudioManager.play();
        //TODO 处理正在播放的音频
        this.setData({
          current_play: e.detail.audio_id
        })
      }
  
    }else{
      //暂停
      backgroundAudioManager.pause();
    }
    
  },

  /**作品数据请求函数 */
  getWorkData:function(){
    const _this = this;
    api.getWorkDetail({ "homeworkId": this.data.homeworkId }).then(res => {
      if (res.data.code == 0) {
        var data = Object.assign({}, res.data.data);
        data.commitTime = util.formatTime(data.commitTime);
        // data.title = data.title.replace(/[\r\n]/g, "");
        _this.setData({
          homework: data,
          loading: false
        })
      } else {
        wx.showToast({
          title: '服务器错误',
          icon: 'none',
          duration: 3000,
          complete: function () {
            wx.redirectTo({
              url: '/pages/unauth/unauth',
            })
          }
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 3000,
        complete: function () {
          wx.redirectTo({
            url: '/pages/unauth/unauth',
          })
        }
      })
    })
  },

  onLoad: function (options) {
    //获取传入参数
    if (options.homeworkId!=undefined&&options.homeworkId!=''){
      this.setData({ homeworkId: options.homeworkId})
    }else{
      this.setData({ homeworkId: null });
      wx.redirectTo({
        url: '/pages/unauth/unauth',
      });
      return;
    }
    const _this = this;

    //请求数据
    // if (wx.getStorageSync('access_token') && wx.getStorageSync('access_token') != ''){
    //   this.getWorkData()
    // }else{
    //   app.tokenCallback = (token) => {
    //     if(token&&token != ''){
          this.getWorkData();
    //     }

    //   }
    // }

    //音频监听
    backgroundAudioManager.onWaiting(function(){
      console.log("------音频加载中------")
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
    });
    backgroundAudioManager.onCanplay(function(){
      console.log("------开始播放------");
      wx.hideLoading({
        success:function(){
          backgroundAudioManager.play();
        }
      })  
    });
    backgroundAudioManager.onStop(function () {
      console.log("------停止播放------");
    })
    backgroundAudioManager.onPause(function(){
      //记录音频当前节点
      console.log("------暂停播放------");
      var currentTime = backgroundAudioManager.currentTime;
      _this.setData({
        currentTime: currentTime
      })
    })
    /**音频自身播放完毕 */
    backgroundAudioManager.onEnded(function(){
      console.log("------结束播放------");
      _this.setData({
        current_play: ''
      })
    })
  },

  onHide(){
    backgroundAudioManager.stop();
    this.setData({
      current_play: '',
      currentTime: 0
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    backgroundAudioManager.stop();
    this.setData({
      current_play: '',
      currentTime: 0
    })
  },

  /**分享 */
  onShareAppMessage(res) {
    //res: from,target,webViewUrl
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    return {
      title: "画啦啦学员作品",
      path: currentPage.route + util.qs(currentPage.options),
      imageUrl: ""
    }
  },

  /**切换老师寄语、作品故事模块 */
  commentSwitch: function(e){
    var status = e.currentTarget.dataset.status;
    if(this.data.comment_status === status) return;
    if(this.data.comment_status === '0'){
      this.setData({
        comment_status: '1',
        top_left_radius: '18rpx',
        top_right_radius: '0'
        });
    }else{
      this.setData({ 
        comment_status: '0',
        top_left_radius: '0',
        top_right_radius: '18rpx' 
        });
    }
    backgroundAudioManager.stop();
    this.setData({
      current_play: '',
      currentTime: 0
    })
  },

  /**返回作品中心 */
  returnToHome:function(){
    backgroundAudioManager.stop();
    this.setData({
      current_play: '',
      currentTime: 0
    });
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})