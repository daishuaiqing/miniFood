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
    goodsList:[
      {
        id:12,
        name:'A级精品香橙',
        unit:'500g/份',
        originPrice:'129.00',
        price:'299.00',
        iconUrl:'/res/image/qingcheng.png'
      },
      {
        id:22,
        name:'小米电池一次性电池12粒',
        unit:'12粒/盒',
        originPrice:'129.00',
        price:'299.00',
        iconUrl:'https://i.loli.net/2019/08/29/GeBvOhXpglQYAtu.jpg'
      },
      {
        id:11,
        name:'索尼进口原生胶卷',
        unit:'500g/份',
        originPrice:'129.00',
        price:'299.00',
        iconUrl:'https://i.loli.net/2019/08/29/MbIQGjwFHgrXCEB.jpg'
      },
      {
        id:19,
        name:'泰国进口牛油果茶',
        unit:'500g/份',
        originPrice:'129.00',
        price:'299.00',
        iconUrl:'https://i.loli.net/2019/08/29/MRYLCJUp8DQTViF.jpg'
      },
      {
        id:41,
        name:'杯子装精品消毒棉签',
        unit:'500g/份',
        originPrice:'129.00',
        price:'299.00',
        iconUrl:'https://i.loli.net/2019/08/29/2vbpGD7KfliLXWn.jpg'
      },
    ],
    cart:[],
    cartNumber:0,
    cartAmount:0,
  },
  //去结算页面
  gotoSettle: function(e){
    wx.navigateTo({
      url:'../order/create/create'
    })
  },
  //菜单切换
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  //点击商品加号，加入购物车
  addCart: function(e){
    let { id, name, price } = e.currentTarget.dataset.goods
    let goodsArr = wx.getStorageSync('cart');
    let i=0
    for( ; i<goodsArr.length; i++){
      if(goodsArr[i].id === id){
        goodsArr[i].number++
        break
      }
    }
    if(i === goodsArr.length){
      goodsArr.push({
        id,
        name,
        price,
        number:1
      })
    }
    wx.setStorageSync('cart', goodsArr)
    this.calc()
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 1000
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
      cartAmount: cartAmount
    })
  },
  //清空购物车
  delAll: function(){
    wx.setStorageSync('cart',[])
    this.calc()
    this.setData({
      cart:[],
      isShowCart: false,
    })
  },
  onLoad: function () {
    //初始化加载时，加载购物车商品数量和金额
    this.calc()
  },
  //点击购物车图标显示加入购物车的商品
  openCart(){
    if(this.data.cartNumber === 0){
      wx.showToast({
        title: '购物车还是空的呦',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if(this.data.isShowCart){
      this.setData({
        isShowCart: false,
      })
    }else{
      this.setData({
        isShowCart: true,
        cart: wx.getStorageSync('cart')
      })
    }
  },
  
})
