const { createOrder } = require('../../../api/goods.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    addressInfo: {
      userName: '张三',
      provinceName: '',
      cityName: '',
      countyName: '',
      telNumber: '18865550002',
      detailInfo: '花木公寓2号楼601'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.calc()
    this.setCurrentTime()
  },

  setCurrentTime: function() {
    var currentDate = new Date()
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    this.setData({
      hours: hours + 1,
      minutes: minutes
    })
  },

  //计算购物车商品数量和金额
  calc: function() {
    let arr = wx.getStorageSync('cart')
    let cartNumber = 0
    let cartAmount = 0
    for (let i = 0; i < arr.length; i++) {
      cartNumber += arr[i].number
      cartAmount += arr[i].number * arr[i].price
    }
    this.setData({
      cartNumber: cartNumber,
      cartAmount: cartAmount,
      goodsList: arr
    })
  },

  // 点击选择收货地址
  goAddress: function() {
    let _that = this
    wx.chooseAddress({
      success(res) {
        _that.setData({
          addressInfo: res
        })
      },
      fail: err => {
        wx.showModal({
          title: "提醒",
          content: "您还没有授权【通讯地址】，请点击【确定】到微信设置页面开启【通讯地址】后再选择收货地址。",
          showCancel: false,
          confirmText: "确定",
          success: res => {
            if (res.confirm) {
              wx.openSetting()
            }
          }
        })
      }
    })
  },

  //支付
  pay: function(){
    let orderInfo = {
      "address": this.data.addressInfo.detailInfo,
      "city": this.data.addressInfo.cityName,
      "consignee": this.data.addressInfo.userName,
      "goodsPrice": this.data.cartAmount,
      "message": "",
      "mobile": this.data.addressInfo.telNumber,
      "orderGoodsList": [
        {
          "goodsId": 0,
          "number": 0,
        }
      ],
      "orderType": 0,
      "province": this.data.addressInfo.provinceName,
      "region": this.data.addressInfo.countyName
    }
    console.log(orderInfo)
    createOrder(orderInfo).then(res=>{
      if(res.data){
        //创建订单成功，清空购物车
        wx.setStorageSync('cart',[])
        //获得创建的订单号，支付

      }
    })
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