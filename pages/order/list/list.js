const { getOrderList } = require("../../../api/order.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取订单列表
  getOrderList: function(){
    getOrderList().then(res=>{
      console.log(res.data)
      this.setData({
        orderList: res.data
      })
    })
  },

  //掉转详情页
  gotoDetail: function(e){
    wx.navigateTo({
      url: '/pages/order/detail/detail',
    })
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
    this.getOrderList()
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