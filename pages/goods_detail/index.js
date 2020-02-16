// pages/goods_detail/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:{},
    likes:true,
    addNum:1,
    buyIt:true
  },
  canshu:{
    goods_id:"",
  },
  // 收藏
  likeList:[],
  //  购物车
  carList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options)
    this.canshu.goods_id = options.goods_id
    // 获取本地存储
   let loadLike=wx.getStorageSync('likeList')
    let bendi=[]
    if (loadLike != []) {
      bendi =loadLike.map(v => { 
        v = v.dataList.goods_id
        return v
      })   
    }
    // console.log(bendi)
    // 判断本地存储里是否有收藏过
    let yesNo = bendi.indexOf(+this.canshu.goods_id)
    if(yesNo < 0){
      // 等于-1则是没有，收餐不点亮
      this.setData({ likes: true})
    } else { this.setData({ likes: false })}
    this.getLists() 
  },
  // 发请求拿去对应id的商品信息
  async getLists(){
    const res = await request({ url: '/goods/detail', data:this.canshu})
    // console.log(res)
    // console.log(tuList) picList:tuList,
    this.setData({dataList:res.data.message})
  },
  // 在新页面查看大图
  bigimg(e){
    // console.log(e)
    // 读取wxml传过来得参数
    let currents=e.target.dataset.src
    const tuList = this.data.dataList.pics.map(v => {
      v = v.pics_mid_url
      return v
    })
    // 方法
    wx.previewImage({
      // 当前图片路径
      current: currents,
      // 所有图片的数组
      urls: tuList
    })
  },
  // 收藏
  like(){
    this.setData({
     likes :!this.data.likes
    })
    if (this.data.likes){
      wx.showToast({
       title: '取消收藏成功',
       mask:true
      })
      // 读取本地存储
      let loadLike=wx.getStorageSync('likeList')   
      // console.log(loadLike)
      // 遍历数组，如果商品id及取消收藏
      for (let i=0;i <loadLike.length;i++){
        if (loadLike[i].dataList.goods_id===+this.canshu.goods_id && loadLike[i].likes !== this.data.likes ){
          loadLike.splice(i, 1)  
        }
      }
        // console.log(loadLike)
      wx.setStorageSync('likeList', loadLike)
    }else{
      wx.showToast({
        title: '收藏成功',
        mask: true
      })
      // 将数据存入本地
      let loadLike = wx.getStorageSync('likeList')
      this.likeList = [this.data, ...loadLike]
      wx.setStorageSync('likeList',  this.likeList)
    }
   
  },
  // 加入购物车
  addCar(){
    wx.showToast({
      title: '加入购物车成功',
      mask:true
    })
    let addList=wx.getStorageSync('addList')
    if (addList && addList.length!=0){
      // console.log('3')
      for(let j=0; j<addList.length;j++){
        // console.log('4')
        if(addList[j].dataList.goods_id===+this.canshu.goods_id){
          // console.log('1')
          addList[j].addNum+=1
          this.carList = [...addList]
          wx.setStorageSync('addList', this.carList)
          break;
        }else{
          // console.log('4')
          this.carList = [this.data, ...addList]
          wx.setStorageSync('addList', this.carList)
        }
      }
    }else{
      console.log('2')
      this.carList = [this.data, ...addList]
      wx.setStorageSync('addList', this.carList)
    }
  },


  /**
   * 
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