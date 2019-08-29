//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShowCart: false,//是否显示购物车商品
    isShowCartBar: true,//是否显示购物车的Bar
    cart: [],//购物车
    currentTab: 0,
    menuList: [
      '好吃推荐',
      '新品尝鲜',
      '所有果品',
      '鲜果现切',
      '招牌果品',
      '西瓜密瓜',
      '葡提浆果',
      '桃李杏枣',
      '纱卡拉卡',
      '私密马赛'
    ],
  },
  //菜单切换
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //this.loadGoodView();
  },
  //适配商品列表的View高度
  // loadGoodView(){
  //   let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
  //   let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
  //   this.setData({
  //     height: windowHeight * 750 / windowWidth - 92
  //   })
  // },
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
