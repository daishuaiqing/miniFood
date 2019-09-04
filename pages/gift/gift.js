// pages/gift/gift.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:null
  },
  userInfo:null,
  bindcode(e) {
    console.log(e)
    this.setData({
      code:e.detail.value
    })
  },
  bindcodes(e) {
    console.log(e)
    this.setData({
      code: e.detail.value
    })
  },
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    
  },
  // 点击兑换福利码
  exchange() {
    let that = this
    let data = {
      code:this.data.code,
      phone: this.data.userInfo.phone
    }
    if(this.data.code === null) {
      wx.showToast({
        title: '请输入兑换码',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      /* util.request(api.Exchange_Code,data,'get').then(res => {
        console.log(res)
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        
      }) */
    }
  },
})