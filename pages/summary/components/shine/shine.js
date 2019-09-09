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
      // 1.7s后执行动画，动画时长0.3s
      setTimeout(() => {
        this.setData({
          isShowCloseAnimation: true
        })
      }, 1700)
      // 动画执行完销毁节点
      setTimeout(() => {
        this.setData({
          isShowLikeModal: false,
          isShowCloseAnimation: false
        })
      }, 2000)
    }
  }
})
