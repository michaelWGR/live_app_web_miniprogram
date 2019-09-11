// pages/summary/components/assess/assess.js
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
      title: 'http://10.10.117.199:3000/images/summary-assess-title.png',
      background0: 'http://10.10.117.199:3000/images/summary-assess-bg0.png',
      background1: 'http://10.10.117.199:3000/images/summary-assess-bg1.png',
      background2: 'http://10.10.117.199:3000/images/summary-assess-bg2.png',
      scoreLeft: 'http://10.10.117.199:3000/images/summary-assess-score-left.png',
      scoreMiddle: 'http://10.10.117.199:3000/images/summary-assess-score-middle.png',
      scoreRight: 'http://10.10.117.199:3000/images/summary-assess-score-right.png',
      backgroundLeft: 'http://10.10.117.199:3000/images/summary-assess-left.png',
      backgroundRight: 'http://10.10.117.199:3000/images/summary-assess-right.png',
      backgroundCloud: 'http://10.10.117.199:3000/images/summary-assess-cloud.png',
      backgroundCloudLeft: 'http://10.10.117.199:3000/images/summary-assess-cloud-left.png'
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
