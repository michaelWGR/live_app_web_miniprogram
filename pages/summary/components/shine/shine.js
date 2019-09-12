// pages/summary/components/shine/shine.js
const util = require('../../../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currIndex: 0,
    isShowLikeModal: false,
    isShowCloseAnimation: false,
    praiseImg: util.img_baseUrl + '/summary/praise.gif',
    mockData: [{
        img: util.img_baseUrl + 'summary/card-background.png'
    }, {
        img: util.img_baseUrl + 'summary/card-background.png'
    }, {
        img: util.img_baseUrl + 'summary/card-background.png'
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperSlide: function (e) {
      this.setData({
        currIndex: e.detail.current
      })
    },
    onClickLike: function () {
      this.setData({
        isShowLikeModal: true
      })
      // 1s后执行动画，动画时长0.4s
      setTimeout(() => {
        this.setData({
          isShowCloseAnimation: true
        })
      }, 1000)
      // 动画执行完销毁节点
      setTimeout(() => {
        this.setData({
          isShowLikeModal: false,
          isShowCloseAnimation: false
        })
      }, 1400)
    }
  }
})
