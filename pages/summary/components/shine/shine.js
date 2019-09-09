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
    }
  }
})
