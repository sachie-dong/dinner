// page/component/orders/orders.js
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    packing: 2,
    points: 5,
    times: '12:00',
    returnFood:{
      sumCount:0,
      total:'0.00',
      list:{
      }
    },
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  onLoad: function (e) {
    var returnFood=JSON.parse(e.returnFood);
    this.setData({returnFood:returnFood});
  },
  onReady() {
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let returnFood = this.data.returnFood;
    let packing = this.data.packing;
    let points = this.data.points;
    let total = 0;
    total = parseFloat(returnFood.total) + parseFloat(packing) -parseFloat(points)*0.1
    this.setData({
      total: toDecimal2(total),
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text: 'center',
      complete() {
        wx.switchTab({
          url: '/pages/me/me'
        })
      }
    })
  }
})
function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}  