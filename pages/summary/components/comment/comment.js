// pages/summary/components/comment/comment.js
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
      title: 'http://10.10.117.199:3000/images/summary-comment-title.png',
      headImage: 'http://10.10.117.199:3000/images/summary-comment-head.png',
      like: 'http://10.10.117.199:3000/images/summary-comment-like-before.png'
    },
      name: '小卷',
      content: '维浩宝贝开始时画作的物体都是常见的物品形状和使用方式；现在，宝贝的会根据自己的感受表达，如月亮是很冷的，太冷就会把人冻得发紫。宝贝在色彩与沟通的排列运用上，还可以提高，建议再学习《手账的绘画》这节课。',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    thankTeacher() {
      var imageUrl = this.data.imageUrl;
      imageUrl.like = 'http://10.10.117.199:3000/images/summary-comment-like-after.gif';

      this.setData({
        imageUrl: imageUrl
      })
    }
  }
})
