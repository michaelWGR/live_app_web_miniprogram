// pages/summary/components/stage/stage.js
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
    image: {
      title: 'http://10.10.117.199:3000/images/summary-stage-title.png',
      crown: 'http://10.10.117.199:3000/images/summary-stage-crown.png',
      cloud: 'http://10.10.117.199:3000/images/summary-stage-cloud.png'
    },
    level: 1,
    stage: 2,
    stageList: ['线条刻画', '图形装饰', '色彩搭配', '构图意识'],
    isShowCardPop: false,
    showCardIndex: '',
    cardList: [
      ['从艺术知识、', '自然文化出发,', '结合平面基础,', '发散图形联想,'],
      ['从艺术知识、', '自然文化出发,', '结合平面基础,', '发散图形联想,'],
      ['从艺术知识、', '自然文化出发,', '结合平面基础,', '发散图形联想,'],
      ['从艺术知识、', '自然文化出发,', '结合平面基础,', '发散图形联想,']
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCardPop(event) {
      this.setData({
        showCardIndex: event.currentTarget.dataset.text,
        isShowCardPop: true
      })
    },

    hidePop() {
      this.setData({
        isShowCardPop: false
      })
    }
  }
})
