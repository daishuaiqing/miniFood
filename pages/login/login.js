const {
  request,
  login
} = require('../../utils/util.js');
const {
  loginUrl,
  updateUserInfoUrl
} = require('../../api/login.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 授权登录
  login: function(e) {
    wx.showLoading({
      title: "授权中"
    })
    let userDetail = e.detail;
    login().then(res => {
      // 使用code到后端换取openid
      request(loginUrl, {
        code: res.code,
      }, 'POST').then(res => {
        wx.setStorageSync("token", res.data.token)
        request(updateUserInfoUrl, {
          signature: userDetail.signature,
          rawData: userDetail.rawData,
          encryptedData: userDetail.encryptedData,
          iv: userDetail.iv
        }, "POST").then(res => {
          console.log("登陆成功后返回信息", res)
          wx.setStorageSync("userInfo", res.data)
          wx.showToast({
            title: "授权成功",
            duration: 1500
          })
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
        })
      })
    }).catch(res => {
      app.openNetworkErrorModal();
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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