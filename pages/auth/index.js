import { login}from "../../utils/asynsWx.js"
import{request} from "../../request/request.js"
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  shouquan:async function(e){
    // console.log(e)
    let {encryptedData,rawData,iv,signature}=e.detail
    const post = await login()
    let {code}= post
    const res = await request({
      method: 'POST',
      url: '/users/wxlogin',
      data: { encryptedData, rawData, iv, signature, code}
    })
    let {token} = res.data.message
    // console.log(res)
    wx.setStorageSync("token", token)
    wx.navigateBack({
      delta:1
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