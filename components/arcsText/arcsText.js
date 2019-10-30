// components/arcsText/arcsText.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
    angle: {
      type: Number,
      value: 0
    },
    heightPrecent: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  onload() {
    this.data.text; // 文字
    this.data.angle; // 旋转的角度
    this.data.heightPrecent; // 字间的高度差比率
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
