//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var backgroundAudioManager = wx.getBackgroundAudioManager();
const api = require('../../api/api.js');
var timer = null;

Page({
  data: {
    fromShare: false,
    loading: true,
    show_expand: false,
    lineNum: '',
    is_playing: false,
    homework: {},
    audio_type: null,
    current_time: 0,
    length: 0,
    current_story:{},
    current_play: '',
    currentTime: 0,
    homeworkId: null,
    img_baseUrl: util.img_baseUrl,
    desc_expand: false,
    page_hide: false
  },

  //事件处理函数

  /**音频管理 */
  audioPlay:function(e){
    this.setData({
      audio_type: e.detail.audio_type
    });
    if (e.detail.audio.id == this.data.current_play) {
      //暂停
      if(!e.detail.is_play){
        backgroundAudioManager.pause();
        if (e.detail.audio_type == 1){
          this.setData({
            current_time: backgroundAudioManager.currentTime
          })
        }
        
      }else{
        //重新播放 || 拖动进度条
        var title = e.detail.audio.urlHost + e.detail.audio.urlPath;
        var src = e.detail.audio.urlHost + e.detail.audio.urlPath;
        if (e.detail.audio_type == 1){
          var start = e.detail.current > 0 ? e.detail.current : this.data.current_time;
        }else{
          var start = backgroundAudioManager.currentTime;
        }
        
        this.audioPlayFnc(title, src, start);
      }
      
    } else {
      this.setData({
        current_play: e.detail.audio.id
      });

      var title = e.detail.audio.urlHost + e.detail.audio.urlPath;
      var src = e.detail.audio.urlHost + e.detail.audio.urlPath;
      var start = 0;
      this.audioPlayFnc(title, src, 0);
    }
    
  },

  /**作品数据请求函数 */
  getWorkData:function(token){
    const _this = this;
    api.getWorkDetail({ "homeworkId": this.data.homeworkId },token).then(res => {
      if (res.data.code == 0) {
        var data = Object.assign({}, res.data.data);
        _this.setData({
          homework: data,
          loading: false
        },()=>{
          let query = wx.createSelectorQuery();
          query.select('.unexpand').boundingClientRect(rect => {
            if(!rect) return;
            let height = rect.height * 750 / app.globalData.screenWidth;
            _this.setData({
              lineNum: height < 70 ? 3 : 2,
              show_expand: height < 70 ? false : true
            })
          }).exec();
        });
        
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
        title: '请求失败',
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

  handleDescExpand: function(){
    this.setData({
      desc_expand: !this.data.desc_expand
    })
  },

  /** 音频播放 */
  audioPlayFnc(title, src, start) {
    backgroundAudioManager.startTime = start;
    backgroundAudioManager.title = title;
    backgroundAudioManager.src = src;
  },

  /** 点赞 */
  praiseHandle() {
    api.praiseHandle({ homeworkId: this.data.homeworkId},app.globalData.access_token)
        .then(res=>{
          if(res.data.code == 0){
            if(res.data.data){
              this.setData({
                homework: { ...this.data.homework, praiseNum: this.data.homework.praiseNum + 1, praiseFlag: 1}
              })
            }
          } else {
            wx.showToast({
              title: '点赞失败',
              icon: 'none',
              duration: 3000
            })
          }
        }).catch(err=>{
          console.log(err)
          wx.showToast({
            title: '系统错误',
            icon: 'none',
            duration: 3000
          })
        })

  },

  onShow: function () {
    if (this.data.page_hide){
      this.getWorkData(app.globalData.access_token);
    }
  },

  onLoad: function (options) {
    //获取传入参数
    if (options.homeworkId!=undefined&&options.homeworkId!=''){
      this.setData({ homeworkId: options.homeworkId, fromShare: app.globalData.fromShare});
    }else{
      this.setData({ homeworkId: null, fromShare: app.globalData.fromShare });
      wx.redirectTo({
        url: '/pages/unauth/unauth',
      });
      return;
    }
    const _this = this;
    //请求数据
    if (app.globalData.access_token && app.globalData.access_token != '') {
      this.getWorkData(app.globalData.access_token);
    } else {
      app.tokenCallback = (token) => {
        if (token && token != '') {
          _this.getWorkData(token);
        }
      }
    }

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
          _this.setData({
            length: backgroundAudioManager.duration
          })
        }
      })  
    });
    backgroundAudioManager.onTimeUpdate(function(){
      if(_this.data.audio_type == 1){
        //监听当前进度
        _this.setData({
          current_time: backgroundAudioManager.currentTime
        })
      }
    });
    backgroundAudioManager.onStop(function () {
      console.log("------停止播放------");
    })
    backgroundAudioManager.onPause(function(){
      //记录音频当前节点
      console.log("------暂停播放------");
    })
    /**音频自身播放完毕 */
    backgroundAudioManager.onEnded(function(){
      console.log("------结束播放------");
      /** 手机端背景音频的执行频率约为0.3s一次，精确到0.01s,做视觉效果处理 */
      if(_this.data.audio_type == 1){
        _this.selectComponent("#audio-player").setPlayStatus(false);
        _this.setData({
          current_time: backgroundAudioManager.duration
        });
        var timeout = setTimeout(function(){
          _this.setData({
            current_time: 0
          });
          clearTimeout(timeout)
        },30)
      }else if(_this.data.audio_type == 2){
        _this.selectComponent("#audio-msg-"+_this.data.current_play).setPlayStatus(false);
      }
    });
  },

  onHide(){
    backgroundAudioManager.stop();
    this.setData({
      current_play: '',
      current_time: 0,
      page_hide: true
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    backgroundAudioManager.stop();
    this.setData({
      current_play: '',
      current_time: 0
    })
  },

  /**分享 */
  onShareAppMessage(res) {
    //res: from,target,webViewUrl
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    return {
      title: "这是我们家宝贝的画作，快看看吧~",
      path: currentPage.route + util.qs(currentPage.options) + '&showBackIcon=false',
      imageUrl: this.data.homework.url
    }
  },

  /**跳转至班级作品 */
  toClass:function(){
    var _this = this;
    var pages = getCurrentPages();
    if(pages[pages.length-2].route == 'pages/class/class'){
      wx.navigateBack({
        delta: 1,
        success: function(){
          backgroundAudioManager.stop();
          _this.setData({
            current_play: '',
            current_time: 0
          });
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/class/class?homeworkId=' + this.data.homeworkId,
        success: function(){
          backgroundAudioManager.stop();
          _this.setData({
            current_play: '',
            current_time: 0
          });
        }
      })
    }
    
  }
})