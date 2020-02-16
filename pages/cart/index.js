// pages/cart/index.js
import { showModal } from "../../utils/asynsWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    allBuy:false,
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let addList = wx.getStorageSync('addList') || []
    this.setCar(addList)
  },


  // 商品单选
  noBuy(e) {
    // console.log(e)
    const { id } = e.currentTarget.dataset
    const { carList } = this.data
    let index = carList.findIndex(v => v.dataList.goods_id === id)
    carList[index].buyIt = !carList[index].buyIt
    this.setCar(carList)
  },


  // 全选
  buybuy(){
    let { allBuy, carList } = this.data;
    // 点击全选 对 allBuy 状态取反
    allBuy = !allBuy;
    //对购物车里面的carts属性进行循环 v.buyIt = allBuy
    // forEach 用法 与map区别 map 会返回循环之后的数组 forEach不会
    carList.forEach(v => v.buyIt = allBuy);
    this.setCar(carList);
  },

  // 减少商品
  down:async function(e){
    const { id,num } = e.currentTarget.dataset
    const { carList } = this.data
    let index = carList.findIndex(v => v.dataList.goods_id === id)
    if (carList[index].addNum===1 && num===-1){
      const res=await showModal({ content:"您确定要删除商品吗？"})
      // console.log(res)
      if(res.confirm){
        carList.splice(index, 1)
      } 
    }else{
      carList[index].addNum += num
    }
    this.setCar(carList)
  },
  // setCar的作用是用来计算商品总价和数量
  setCar: function (addList) {
    let allBuy=true
    let totalPrice=0
    let totalNum=0
    console.log(addList)
    addList.forEach(v=>{
      if(v.buyIt){
        totalPrice+=v.dataList.goods_price*v.addNum
        totalNum +=v.addNum
      }else{
        allBuy = false;
      }
    })
    this.setData({
      carList: addList,
      allBuy,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("addList", this.data.carList)
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