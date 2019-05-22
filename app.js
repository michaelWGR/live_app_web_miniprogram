//app.js
const api = require('/api/api.js')

App({
  onLaunch: function () {
    var _this = this;

    //获取启动参数
    var from_msg = wx.getLaunchOptionsSync();
    this.globalData = Object.assign(this.globalData, from_msg);

    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          api.authorize({"code": res.code}).then(res=>{
            if(res.data.code == 0){
              var access_token = res.data.data.accessToken;
              wx.setStorage({
                key: "access_token",
                data: access_token
              });
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
          // wx.request({
          //   url: 'https://appminip-test.61draw.com/v1/applets/signature',
          //   method: 'POST',
          //   header: {
          //     'content-type': 'application/json' //默认
          //     },
          //   data: {
          //     "code":res.code
          //     },
          //   success:function(res){
          //     console.log(res);
          //     if(res.data.code == 0){
          //       //校验成功，存储accessToken
          //       this.globalData.access_token = res.data.data.accessToken;
          //       // var access_token = res.data.data.accessToken;
          //       // wx.setStorage({
          //       //   key: "access_token",
          //       //   data: access_token
          //       // })
          //     }
              
          //   },
          //   fail:function(err){
          //     wx.showToast({
          //       title: '认证失败',
          //       icon: 'none',
          //       duration: 2000,
          //       complete:function(){
          //         console.log(err);
          //         wx.redirectTo({
          //         url: '/pages/unauth/unauth',
          //       })
          //       }
          //     })
          //   }
          // })
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
    userInfo: null,
    access_token: ''
  }
})