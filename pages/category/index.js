// pages/category/index.js
// 引入请求封装
import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    rightList: [],
    // 点击时的索引号
    changedd: 0,
    // 滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口返回数据,写在data同级方便调用
  BigList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面加载时，获取本地数据
    const BigList = wx.getStorageSync('biglist')
    // 如果没有数据
    if (!BigList) {
      // 发请求
      this.getList()
    } else {
      // 有数据，但是超时了。也重新发请求10s
      if (Date.now() - BigList.time > 1000 * 120) {
        this.getList()
      } else {
        // 否则将本地读取到的数据赋值给Biglist
        this.BigList = BigList.data;
        //  构建左侧的导航数据
        let navList = this.BigList.map(v => v.cat_name);
        //  构建右侧数据
        let rightList = this.BigList[0].children;
        this.setData({
          navList,
          rightList
        })
      }
    }

  },
  // 发请求拿数据
  async getList() {
    // 使用封装请求
    // request({
    //   url: '/categories'
    // }).then(res=>{
    //   this.BigList = res.data.message;
    //     // 将获取到的数据存储到本地
    //     wx.setStorageSync('biglist', {time:Date.now(),data:this.BigList})
    //     //  构建左侧的导航数据
    //     let navList = this.BigList.map(v => v.cat_name);
    //     //  构建右侧数据
    //     let rightList = this.BigList[0].children
    //     this.setData({
    //       navList,
    //       rightList
    //     })
    // })

    //使用async语法
    const res = await request({
      url: '/categories'
    });
    this.BigList = res.data.message;
    // 将获取到的数据存储到本地
    wx.setStorageSync('biglist', {
      time: Date.now(),
      data: this.BigList
    })
    //  构建左侧的导航数据
    let navList = this.BigList.map(v => v.cat_name);
    //  构建右侧数据
    let rightList = this.BigList[0].children
    this.setData({
      navList,
      rightList
    })

    // wx.request({
    //   url: 'https://www.linweiqin.cn/api/public/v1/categories',
    //   success: (res) => {
    //     console.log(res)
    //     this.BigList = res.data.message;
    //     // 将获取到的数据存储到本地
    //     wx.setStorageSync('biglist', {time:Date.now(),data:this.BigList})
    //     //  构建左侧的导航数据
    //     let navList = this.BigList.map(v => v.cat_name);
    //     //  构建右侧数据
    //     let rightList = this.BigList[0].children
    //     this.setData({
    //       navList,
    //       rightList
    //     })
    //   }
    // })
  },
  changeId(e) {
    // console.log(e)
    // 将点击时传来的参数赋值
    const {
      index
    } = e.currentTarget.dataset
    // 同时将右侧数组重新获取对应的索引号数据
    let rightList = this.BigList[index].children
    this.setData({
      changedd: index,
      rightList,
      // 让滚动条距离变为零
      scrollTop: 0
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})