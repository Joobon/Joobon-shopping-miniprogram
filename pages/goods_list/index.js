// pages/goods_list/index.js
import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: "综合",
        isActive: true
        },
      {
        id: 1,
        name: "销量",
        isActive: false
      },
      {
        id: 2,
        name: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:8
  },
  // 总条数
 totalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 路由传的参数
    console.log(options)
    if (options.cid) { this.queryParams.cid = options.cid}
    if (options.query) { this.queryParams.query = options.query }
    console.log(this.queryParams)
    // console.log(options.cid)
    this.getList()
  },
  async getList(){
    const res = await request({ url: '/goods/search', data: this.queryParams })
    // console.log(res)
    // 总条数
    const total=res.data.message.total
    this.totalPage=Math.ceil(total/this.queryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList,...res.data.message.goods] 
       })
      //  终止下拉刷新
    wx.stopPullDownRefresh()
  },

  hanldetape(e){
    console.log(e)
    this.setData({
      tabs:e.detail
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
      this.queryParams.pagenum=1;
      this.data.goodsList.length=0;
      this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum>=this.totalPage){
        wx.showToast({
          title: '没有更多数据了',
        })
    }else{
      this.queryParams.pagenum++
      this.getList()
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})