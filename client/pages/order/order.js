// page/component/orders/orders.js
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    packing:2,
    points:10,
    times: '18:00',
    orders:[
      { id: 1, title: '新鲜芹菜 半斤', image:'/resources/jpg/vegetable1.png',num:4,price:10},
      { id: 2, title: '素米 500g', image:'/resources/jpg/vegetable2.png',num:1,price:5}
      ]
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  onReady() {
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let packing = this.data.packing;
    let points = this.data.points;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
      
    }
    this.setData({
      total: total + packing - points
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/pages/me/me'
        })
      }
    })
  }
})