const { checkLoginUrl } = require("../api/login.js")
const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 封装微信的request
const request = (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          console.log(res)
          reject(res)
          //app.openNetworkErrorModal();
        }
      },
      fail(err) {
        console.log(err)
        reject(err)
        // app.openNetworkErrorModal(err.errMsg);
      }
    })
  });
}

/**
 * 调用微信登录
 */
const login = () => {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}
//校验是否登陆
const checkLogin = () => {
  return new Promise(function (resolve, reject) {
    let token = wx.getStorageSync("token")
    let userInfo = wx.getStorageSync("userInfo")
    if(token && userInfo){
      request(checkLoginUrl).then(res=>{
        console.log('token有效性',res.data)
        if(!res.data){
          resolve(false);
        }
      })
      resolve(true);
    }else{
      resolve(false);
    }
  });
}

module.exports = {
  request: request,
  login,
  checkLogin,
  formatTime: formatTime
}