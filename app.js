//app.js
const api = require('/api/api.js')
/**
 * talkingData埋点：tdweapp.td_app_sdk.event(Object)
 * Object参数说明:
 * id (String) 事件id,
 * label (String) 事件描述,
 * params (Object) 事件参数
 */
const tdweapp = require('./utils/talkingData-analysis/tdweapp.js');

App({
  onLaunch: function (res) {
    /**判断小程序是否由作品分享及其相关小程序码打开 */
    if (res.query.showBackIcon == 'false'){
      this.globalData.fromShare = true;
    }else{
      this.globalData.fromShare = false;
    }
    var _this = this;

    //获取启动参数
    var from_msg = wx.getLaunchOptionsSync();
    this.globalData = Object.assign(this.globalData, from_msg);

    //获取屏幕宽度
    wx.getSystemInfo({
      success: function(res) {
        _this.globalData.screenWidth = res.screenWidth
      },
    })

    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey
        if(res.code){
          api.authorize({"code": res.code}).then(res=>{
            if(res.data.code == 0){
              var access_token = res.data.data.accessToken;
              this.globalData.access_token = res.data.data.accessToken;
              this.globalData.openId = res.data.data.openId
              if(this.tokenCallback){
                this.tokenCallback(res.data.data.accessToken);
              }
            }

          }).catch(err=>{
            wx.showToast({
              title: '认证失败',
              icon: 'none',
              duration: 2000,
              complete: function () {
                console.log(err);
                wx.redirectTo({
                url: '/pages/unauth/unauth',
                })
              }
            })
          })
        }
      }
    })
    // 获取用户信息(已经获取授权)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    fromShare: false,
    userInfo: null,
    access_token: '',
    openId: ''
  }
})