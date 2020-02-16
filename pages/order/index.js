import {request} from "../../request/request.js"
// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    tabs: [
      {
        id: 0,
        name: "全部",
        isActive: true,
        type:1
      },
      {
        id: 1,
        name: "待付款",
        isActive: false,
        type: 2
      },
      {
        id: 2,
        name: "待发货",
        isActive: false,
        type: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
  },
  async getOrderList(){
    let activeTab = this.data.tabs.filter(v => v.isActive);
    const res=await request({
      url:'/my/orders/all',
      data:{
        type: activeTab[0].type
      }
    })
    console.log(res)
    this.setData({
      order:res.data.message.orders.map(v=>({
        ...v,
        create_time_cn: (new Date(v.create_time * 1000).toLocaleString())
      }))
    })
    console.log(this.data.order)
  },
  changeIndex(e){
    // console.log(e)
    this.setData({
      tabs: e.detail
    })
  },
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