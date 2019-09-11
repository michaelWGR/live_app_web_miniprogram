// pages/summary/components/promote/promote.js
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
      title: 'http://10.10.117.199:3000/images/summary-promote-title.png',
      arrow: 'http://10.10.117.199:3000/images/summary-info-arrow.png'
    },
    add: 8,
    accumulate: 15,
    total: 24,
    currIndex: 0,
    cardList: [
      {
        title: '色彩搭配',
        content: ['色彩敏锐度', '色彩对比运用']
      },
      {
        title: '绘画技发',
        content: ['厚涂水粉', '油水分离', '拼贴手法', '创意技法']
      },
      {
        title: '物体排列',
        content: ['大小变化', '透视关系']
      },
      {
        title: '测试测试',
        content: ['第四页', '的卡片的详情', '测试滚动']
      }
    ]
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
