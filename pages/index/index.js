// 引入请求封装
import {request} from '../../request/request.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: "搜索",
    lunbo: [],
    navList:[],
    floorList:[],
    // titles: [{ tt: '1' }, { tt: '2' }, { tt: '3' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList(),
    this.getnavList(),
    this.getFloor()

  },
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(res=>{
      this.setData({
          lunbo: res.data.message
        })
    })
    // wx.request({
    //    url: "https://api.zbztb.cn/api/public/v1/home/swiperdata",
    //    success:(res)=>{
    //      this.setData({
    //       lunbo: res.data.message
    //     })
    //    }
    //  }) 
  },
  getnavList() {
    request({
      url: "/home/catitems"
    }).then(res=>{
      this.setData({
        navList: res.data.message
        })
    })
    // wx.request({
    //   url: "https://api.zbztb.cn/api/public/v1/home/catitems",
    //   success: (res) => {
    //     // console.log(res)
    //     this.setData({
    //       navList: res.data.message
    //     })
    //   }
    // })
  },
  getFloor() {
    request({
      url: "/home/floordata" 
    }).then(res=>{
console.log(res)
      this.setData({
          floorList: res.data.message
        })
    })

    // wx.request({
    //   url: "https://api.zbztb.cn/api/public/v1/home/floordata",
    //   success: (res) => {
    //     // console.log(res)
    //     this.setData({
    //       floorList: res.data.message
    //     })
    //   }
    // })
  },
  
  //子传父
  // oooo(e){
  //   console.log(e.detail)
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})