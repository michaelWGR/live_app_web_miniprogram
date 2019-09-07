// components/painting/painting.js
const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    previousMargin: {
      type: String,
      value: ''
    },
    nextMargin: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currIndex: 0,
    mockData: [{
        img: util.img_baseUrl + 'painting.png'
    },{
        img: util.img_baseUrl + 'painting.png'
    },{
        img: util.img_baseUrl + 'painting.png'
    }],
    descriptions: [1, 2]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperSlide: function(e) {
      this.setData({
        currIndex: e.detail.current
      })
    }
  },

})
