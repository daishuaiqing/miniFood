// pages/coupons/coupons.js
let app = getApp()
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        activeTab: '0',
        havelist: false,
        change: null,
        myindex: true,
        timestamps: null,
        freelist: [],
        is_use: 0,
        item: null,
        type: null
    },
    tabFun(e) {
        console.log(e);

        let id = e.currentTarget.id
        this.setData({
            activeTab: id
        })
        console.log(id)
        switch (this.data.activeTab) {
            case '0':
                this.setData({
                    is_use: 0,
                    freelist: [],
                    havelist: false
                })
                this.showdata(this.data.activeTab)
                break;
            case '1':
                this.setData({
                    is_use: 1,
                    freelist: []

                })
                this.getDatabyMy()
                break;
            case '2':
                this.setData({
                    is_use: 0,
                    freelist: []
                })
                this.getDatabyMy()
                break;
            default:
                break;
        }
    },
    changeimg(e) {
        console.log(e)
        if (this.data.change === null) {
            this.setData({
                item: e.currentTarget.dataset.alphabeta,
                change: e.currentTarget.dataset.alphabeta.coupon_no
            })
        } else {
            this.setData({
                item: null,
                change: null
            })
        }
    },
    showdata(val) {
        console.log(val);
        console.log(this.data.type, 'typs');
        if (this.data.type == 'myindex') {

            this.getDatabyMy()
        } else {
            this.getDatabyOrder(val)

        }
    },

    getDatabyMy() {
        wx.showLoading({
            title: '加载中'
        })
        console.log(this.data.userInfo)
        let data = {
            mobile: this.data.userInfo.phone,
            is_use: this.data.is_use
        }
        console.log(data)
        util.request(api.Free_List, data).then(res => {

            if (res.data.data.total_results === 0) {
                this.setData({
                    havelist: false
                })
            } else {
                let data = res.data.data.can_use.reduce((freelist, item) => {
                    // 获取item的结束时间的毫秒数
                    let endtime = item.end_date.replace(new RegExp("-", "gm"), "/");
                    let computtime = new Date(endtime).getTime();
                    // 截取item的开始时间和结束时间
                    item.start_date = item.start_date.substr(0, 10);
                    item.end_date = item.end_date.substr(0, 10);
                    if (item.coupon_name === '内部福利优惠券') {
                        item.coupon_rule = '福利券,无门槛'
                    }
                    if (this.data.activeTab == 0) {
                        if (this.data.timestamps < computtime) {
                            freelist.push(item);
                        }
                    } else if (this.data.activeTab == 1) {
                        freelist.push(item);
                    } else {
                        if (this.data.timestamps > computtime) {
                            freelist.push(item);
                        }
                    }
                    return freelist
                }, [])
                if (data.length == 0) {
                    this.setData({
                        freelist: data,
                        havelist: false,

                    })
                } else {
                    this.setData({
                        freelist: data,
                        havelist: true,
                        myindex: true
                    })
                }

            }
            wx.hideLoading()

        })
    },

    getDatabyOrder(val) {
        let data = {
            mobile: this.data.userInfo.phone,
            order_money: this.data.money
        }
        util.request(apis.QuerCoupon, data).then(res => {
            let can_use = res.data.data.can_use
            let coupon_list = res.data.data.can_use
            let data = can_use.reduce((freelist, item) => {
                // 获取item的结束时间的毫秒数
                let endtime = item.end_date.replace(new RegExp("-", "gm"), "/");
                let computtime = new Date(endtime).getTime();
                // 截取item的开始时间和结束时间
                item.start_date = item.start_date.substr(0, 10);
                item.end_date = item.end_date.substr(0, 10);
                if (item.coupon_name === '内部福利优惠券') {
                    item.coupon_rule = '福利券,无门槛'
                }
                if (this.data.activeTab == 0) {
                    if (this.data.timestamps < computtime) {
                        freelist.push(item);
                    }
                } else if (this.data.activeTab == 1) {
                    freelist.push(item);
                } else {
                    if (this.data.timestamps > computtime) {
                        freelist.push(item);
                    }
                }
                return freelist
            }, [])

            let datas = coupon_list.reduce((freelist, item) => {
                // 获取item的结束时间的毫秒数
                let endtime = item.end_date.replace(new RegExp("-", "gm"), "/");
                let computtime = new Date(endtime).getTime();
                // 截取item的开始时间和结束时间
                item.start_date = item.start_date.substr(0, 10);
                item.end_date = item.end_date.substr(0, 10);
                if (item.coupon_name === '内部福利优惠券') {
                    item.coupon_rule = '福利券,无门槛'
                }
                if (this.data.activeTab == 0) {
                    if (this.data.timestamps < computtime) {
                        freelist.push(item);
                    }
                } else if (this.data.activeTab == 1) {
                    freelist.push(item);
                    this.setData({
                        myindex: false
                    })
                } else {
                    if (this.data.timestamps > computtime) {
                        freelist.push(item);
                    }
                }
                return freelist
            }, [])


            switch (val) {
                case '0':
                    this.setData({
                        freelist: data,
                        myindex: false
                    })
                    break;
                default:
                    break;
            }

            if (data.length === 0) {
                this.setData({
                    havelist: false
                })
            } else {
                this.setData({
                    havelist: true
                })
            }
        })
    },






    gotoOrder() {
        wx.setStorageSync('free', this.data.item)
        wx.navigateBack({})
            // console.log(this.data.item,this.data.change,wx.getStorageSync('free'))
    },
    gotoindex() {
        console.log('index')
        wx.switchTab({
            url: '../../../tabBar/index/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
        wx.showLoading({
            title: '加载中'
        })
        this.setData({
            money: options.money,
            type: options.type,
        })
        if (this.data.type === 'myindex') {
            this.setData({
                myindex: true
            })
            //this.getDatabyMy()

        } else {
            this.setData({
                myindex: false,
                activeTab: '0',
                is_use: 0,
            })
            //this.getDatabyOrder('0')

        }
        wx.hideLoading()
            // util.request(apis.QuerCoupon,{
            //   mobile: this.data.userInfo.phone,
            //   order_money:money
            // }).then(res => {
            //   console.log(res)
            // })
    }
})