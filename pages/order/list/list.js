const { getOrderList } = require("../../../api/order.js")
const {
  checkLogin
} = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取订单列表
  getOrderList: function () {
    getOrderList().then(res => {
      let orderList = res.data
      for (let i = 0; i < orderList.length; i++) {
        //订单状态转文字
        switch (orderList[i].order.orderStatus) {
          case 0: orderList[i].order.orderStatusText = '待付款'; break;
          case 1: orderList[i].order.orderStatusText = '待配送'; break;
          case 2: orderList[i].order.orderStatusText = '已发出'; break;
          case 3: orderList[i].order.orderStatusText = '已完成'; break;
          case 4: orderList[i].order.orderStatusText = '已关闭'; break;
          case 5: orderList[i].order.orderStatusText = '无效订单'; break;
        }
        //计算订单商品数量
        let goodsNumber = 0
        let goodsList = orderList[i].goods
        for (let index in goodsList) {
          goodsNumber += goodsList[index].number
        }
        orderList[i].goodsNumber = goodsNumber
      }
      this.setData({
        orderList: orderList
      })
    })
  },

  //掉转详情页
  gotoDetail: function (e) {
    wx.setStorageSync('orderInfo', e.currentTarget.dataset.item)
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
    checkLogin().then(res => {
      console.log("检查登录", res)
      if (res) {
        this.getOrderList()
      } else {
        wx.showModal({
          title: '提示',
          content: '您还没有登陆，请登录查看订单信息',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else if (res.cancel) {
              
            }
          }
        })
      }
    })

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