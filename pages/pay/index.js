// 引用自己的封装
import {
  getSetting,
  openSetting,
  chooseAddress,
  showToast,
  requestPayment
} from "../../utils/asynsWx.js"
import {
  request
} from "../../request/request.js"
// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // address接收收货地址
    address: {},
    carList: [],
    totalPrice: 0,
    totalNum: 0,
    yigou: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let addList = wx.getStorageSync('addList') || []
    let address = wx.getStorageSync('address') || {}
    addList.forEach(v => {
      if (v.buyIt === true) {
        this.setData({
          yigou: [...this.data.yigou, v]
        })
      }
    })
    this.setData({
      address
    })
    // console.log(this.data.address)
    this.setCar(addList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},


  //支付
  payMoney: async function(e) {
    try {
      let token = wx.getStorageSync("token")
      console.log(token)
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      let order_price = this.data.totalPrice;
      let consignee_addr = this.data.address.all;
      let goods = [];
      // 获取已选商品的列表
      // console.log(this.data.yigou)
      this.data.yigou.forEach(v => {
        let params = {}
        params["goods_id"] = v.dataList.goods_id;
        params["goods_number"] = v.addNum;
        params["goods_price"] = v.dataList.goods_price
        goods.push(params)
      })
      const res = await request({
        url: '/my/orders/create',
        method: 'post',
        data: {
          order_price,
          consignee_addr,
          goods
        }
      })
      let {order_number}=res.data.message
      // console.log(order_number)
      const pays=await request({
        url:'/my/orders/req_unifiedorder',
        method:'post',
        data:{
          order_number
        }
      })
      let {pay}=pays.data.message
      // console.log(pay)
      await requestPayment(pay)
      await request({
        url:"",
        method:"post",
        data:{
          order_number
        }
      })
      await showToast({
        title:"支付成功"
      })
      let newAddList=wx.getStorageSync("addList")||[]
      newAddList = newAddList.filter(v => !v.checked)
      wx.setStorageSync("addList", newAddList)
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (e) {
      console.log(e)
       showToast({
        title: "支付成功"
      })
    }
  },




  // 获取用户的收货地址
  address: async function(e) {
    try {
      const res = await getSetting()
      // console.log(res)
      if (res.authSetting) {
        openSetting()
      }
      let address = await chooseAddress()
      // console.log(address)
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address)
      this.setData({
        address
      })
    } catch (e) {
      console.log(e)
    }

  },
  // setCar的作用是用来计算商品总价和数量
  setCar: function(addList) {
    let totalPrice = 0
    let totalNum = 0
    addList.forEach(v => {
      if (v.buyIt) {
        totalPrice += v.dataList.goods_price * v.addNum
        totalNum += v.addNum
      }
    })
    this.setData({
      carList: addList,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("addList", this.data.carList)
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