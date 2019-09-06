// pages/order/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    userInfo:{
      userName:'张三',
      mobile:'18865550002',
      address:'花木公寓2号楼601'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.calc()
    this.setCurrentTime()
  },

  setCurrentTime: function(){
    var currentDate=new Date()
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    this.setData({
      hours: hours+1,
      minutes: minutes
    })
  },

  //计算购物车商品数量和金额
  calc: function(){
    let arr = wx.getStorageSync('cart')
    let cartNumber = 0
    let cartAmount = 0
    for(let i=0;i<arr.length;i++){
      cartNumber+=arr[i].number
      cartAmount+=arr[i].number * arr[i].price
    }
    this.setData({
      cartNumber: cartNumber,
      cartAmount: cartAmount,
      goodsList: arr
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