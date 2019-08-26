//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShowCart: false,//是否显示购物车商品
    isShowCartBar: false,//是否显示购物车的Bar
    cart: [],//购物车
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.loadGoodView();
  },
  //适配商品列表的View高度
  loadGoodView(){
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      height: windowHeight * 750 / windowWidth - 92
    })
  },
  //点击购物车图标显示加入购物车的商品
  openCart(){
    if(this.data.isShowCart){
      this.setData({
        isShowCart: false,
      })
    }else{
      this.setData({
        isShowCart: true,
      })
    }
    
  },
  
})
