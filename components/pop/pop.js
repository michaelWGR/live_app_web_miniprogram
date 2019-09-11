// components/pop/pop.js
let closePopTimeOut = null

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visibility: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if (newVal === this.data.visibilityData) return
        if (newVal) {
          this.setData({
            visibilityData: true
          })
        } else {
          this.setData({
            popWrapClass: 'pop-wrap-out',
            popClass: 'pop-out'
          })
          clearTimeout(closePopTimeOut)
          closePopTimeOut = setTimeout(() => {
            this.setData({
              popWrapClass: '',
              popClass: '',
              visibilityData: false
            })
          }, 450)
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    popWrapClass: '',
    popClass: '',
    visibilityData: false
  },

  onload() {
    this.setData({
      visibilityData: this.properties.visibility
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePop() {
      this.setData({
        popWrapClass: 'pop-wrap-out',
        popClass: 'pop-out'
      })
      clearTimeout(closePopTimeOut)
      closePopTimeOut = setTimeout(() => {
        this.setData({
          popWrapClass: '',
          popClass: '',
          visibilityData: false
        })
        this.triggerEvent('hidePop')
      }, 450)
    }
  }
})
