const {
  getCategoryList
} = require('../../api/category.js');
const {
  getGoodsList
} = require('../../api/goods.js');
const {
  checkLogin
} = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    isShowCart: false, //是否显示购物车商品
    isShowCartBar: true, //是否显示购物车的Bar
    cart: [], //购物车
    currentTab: 0,
    menuList: [
      '好吃推荐',
      '新品尝鲜',
      '鲜果现切',
      '招牌果品'
    ],
    goodsList: [{
      id: 22,
      name: '小米电池一次性电池12粒',
      unit: '12粒/盒',
      originPrice: '129.00',
      price: '299.00',
      iconUrl: 'https://i.loli.net/2019/08/29/GeBvOhXpglQYAtu.jpg'
    }],
    cart: [],
    cartNumber: 0,
    cartAmount: 0,
  },
  //去结算页面
  gotoSettle: function(e) {
    let cart = wx.getStorageSync('cart')
    if (cart.length < 1) {
      wx.showToast({
        title: '购物车还是空的呦',
        icon: 'none',
        duration: 1000
      })
      return
    }
    let userInfo = wx.getStorageSync("userInfo")
    checkLogin().then(res => {
      if (res) {
        wx.navigateTo({
          url: '../order/create/create'
        })
      } else {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  //菜单切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
    this.getGoodsList(e.currentTarget.dataset.item.id, 1)
  },
  //点击商品加号，加入购物车
  addCart: function(e) {
    let {
      id,
      name,
      price,
      picUrl
    } = e.currentTarget.dataset.goods
    let goodsArr = wx.getStorageSync('cart');
    let i = 0
    for (; i < goodsArr.length; i++) {
      if (goodsArr[i].id === id) {
        goodsArr[i].number++
          break
      }
    }
    if (i === goodsArr.length) {
      goodsArr.push({
        id,
        name,
        price,
        number: 1,
        picUrl: picUrl
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
      cartAmount: cartAmount
    })
  },
  //清空购物车
  delAll: function() {
    wx.setStorageSync('cart', [])
    this.calc()
    this.setData({
      cart: [],
      isShowCart: false,
    })
  },
  //增加购物车商品数量
  addGoodsNumber: function(e){
    let goods = e.currentTarget.dataset.item
    console.log(goods)
    let goodsArr = wx.getStorageSync('cart');
    for (let i = 0; i < goodsArr.length; i++) {
      if (goodsArr[i].id === goods.id) {
        goodsArr[i].number++
        break
      }
    }
    wx.setStorageSync('cart', goodsArr)
    this.calc()
    this.setData({
      cart: goodsArr
    })
  },
  //减少购物车商品数量
  cutGoodsNumber: function(e){
    let goodsId = e.currentTarget.dataset.item.id
    let goodsArr = wx.getStorageSync('cart');
    for (let i = 0; i < goodsArr.length; i++) {
      if (goodsArr[i].id === goodsId) {
        if (goodsArr[i].number >= 1){
          goodsArr[i].number--
        }else{
          goodsArr.splice(i, 1);
        }
        break
      }
    }
    wx.setStorageSync('cart', goodsArr)
    this.calc()
    this.setData({
      cart: goodsArr
    })
  },
  onLoad: function() {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    //初始化加载时，加载购物车商品数量和金额
    this.calc()
    this.getCategoryList()
  },
  onShow: function() {
    this.calc()
  },
  //获取分类
  getCategoryList: function() {
    getCategoryList().then(res => {
      if (res.data.length > 0) {
        this.setData({
          menuList: res.data
        })
        this.getGoodsList(res.data[0].id, 1)
        wx.hideLoading()
      }
    })
  },
  //获取商品
  getGoodsList: function(categoryId, pageNum) {
    getGoodsList({
      categoryId: categoryId,
      pageNum: pageNum
    }).then(res => {
      this.setData({
        goodsList: res.data.content
      })
    })
  },
  //点击购物车图标显示加入购物车的商品
  openCart() {
    if (this.data.cartNumber === 0) {
      wx.showToast({
        title: '购物车还是空的呦',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (this.data.isShowCart) {
      this.setData({
        isShowCart: false,
      })
    } else {
      this.setData({
        isShowCart: true,
        cart: wx.getStorageSync('cart')
      })
    }
  },

})