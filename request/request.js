import {baseURL} from './baseUrl.js'
// wx.request的简单封装
export const request=(params)=>{
  // 定义公共部分的接口地址
  return new Promise((reslove,reject)=>{
    wx.showLoading({
      title: '正在加载中',
      mask:true
    });
    let header = { ...params.header };
    if (params.url.includes("/my/")) {
      header["Authorization"] = wx.getStorageSync("token");
    };
    wx.request({
      //将传入参数结构出来
      ...params,
      header: header,
      url:baseURL+params.url,
      // 要是写了结构出来，就不需要写以下代码
      // data:params.data,
      success:(result)=>{
        reslove(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:(res)=>{
        wx.hideLoading();
      }

    });
  })
}