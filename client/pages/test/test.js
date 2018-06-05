var urlManger = require("../../constant/urlManger.js");
var app = getApp();
Page({
  data: {

    // winWidth: 0,
    // winHeight: 0,
    loadingHidden: false,
    goods: [],
    categoryid: 0,
    pageSize: 10,
    // load_statue:true
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
  },
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    this.setData({
      categoryid: parseInt(e.categoryid)
    })
    this.refreshGoodsList();
  },
  /**
  * 生命周期函数--监听页面加载
  */
  refreshGoodsList: function () {
    this.setData({
      page: 1,
      goods: []
    })
    this.loadGoods();
  },
  loadGoods: function () {
    var that = this;
    wx.request({
      url: urlManger.loadGoods,
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize,
        categoryId: that.data.categoryid,
      },
      success: function (res) {
        that.setData({
          load_statue: true
        })
        var goods = that.data.goods;
        if (res.data.data != null) {
          for (var i = 0; i < res.data.data.length; i++) {
            goods.push(res.data.data[i])
          }
          that.setData({
            goods: goods
          })
        }
        if (res.data.data == null || res.data.data.length < 10) {
          console.log("数据为空")
          that.setData({
            loadingHidden: true
          })
        } else {
          that.setData({
            loadingHidden: false
          })
        }
        console.log(that.data)
      }
      , fail: function () {
        that.setData({
          load_statue: false
        })
      }
      , complete() {
        wx.stopPullDownRefresh();
      }
    })
  },
  //计算
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
    console.log(e.target.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    console.log(this.data.cart.list);
    var num = this.data.cart.list[id] || 0;
    console.log("num" + num);
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },
  //显示隐藏购物车
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  //显示隐藏商品详情弹窗
  showGoodsDetail: function (e) {
    this.setData({
      showGoodsDetail: !this.data.showGoodsDetail,
      id: e.target.dataset.id
    });
  },
  hideGoodsDetail: function () {
    this.setData({
      showGoodsDetail: false
    });
  },
  pay: function () {
    wx.navigateTo({
      url: '../to-pay-order/index'
    })
  },
});