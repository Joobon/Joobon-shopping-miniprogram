// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hanldetap(e) {
      console.log(e)
      const {index} = e.currentTarget.dataset;
      let {tabs}=this.data;
      tabs.map(v => { v.id === index ? v.isActive = true : v.isActive = false })
        this.setData({
          tabs
        })
      // 子传父
     
      this.triggerEvent('changeIndex',tabs)  
    }
  }
})