//封装一个promise对象,调用模态框
export const showModal=(params)=>{
  return new Promise(function(resolve,reject){
    wx.showModal({
      content: params.content,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
//调用用户授权
export const getSetting = (params) => {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
//调用设置权限
export const openSetting = (params) => {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 调用收货地址
export const chooseAddress = (params) => {
  return new Promise(function (resolve, reject) {
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 登陆状态
export const login = (params) => {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 获取用户信息
export const getUserInfo = (params) => {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 支付
export const requestPayment = (pay) => {
  return new Promise(function (resolve, reject) {
    wx.requestPayment({
      ...pay,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 轻提示
export const showToast = (params) => {
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title:params.title,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}