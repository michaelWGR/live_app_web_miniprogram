// pages/summary/components/assess/assess.js
const util = require('./../../../../utils/util.js');

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
    imageUrl: {
      title: util.img_baseUrl + 'summary-assess-title.png',
      background0: util.img_baseUrl + 'summary-assess-bg0.png',
      background1: util.img_baseUrl + 'summary-assess-bg1.png',
      background2: util.img_baseUrl + 'summary-assess-bg2.png',
      scoreLeft: util.img_baseUrl + 'summary-assess-score-left.png',
      scoreMiddle: util.img_baseUrl + 'summary-assess-score-middle.png',
      scoreRight: util.img_baseUrl + 'summary-assess-score-right.png',
      backgroundLeft: util.img_baseUrl + 'summary-assess-left.png',
      backgroundRight: util.img_baseUrl + 'summary-assess-right.png',
      backgroundCloud: util.img_baseUrl + 'summary-assess-cloud.png',
      backgroundCloudLeft: util.img_baseUrl + 'summary-assess-cloud-left.png'
    },
    assessList: [
      {
        name: '思维散发能力',
        value: 4.5
      },
      {
        name: '观察能力',
        value: 4.0
      },
      {
        name: '动手能力',
        value: 3.8
      },
      {
        name: '色彩搭配能力',
        value: 3.5
      },
      {
        name: '色调统一性',
        value: 3.0
      },
      {
        name: '线条装饰能力',
        value: 2.8
      },
      {
        name: '图案装饰能力',
        value: 2.7
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
