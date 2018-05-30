// pages/ding/ding.js
Page({

  /*页面的初始数据*/
  data: {
    selected: true,
    selected1: false,
    total: 27.5,
    orders: [
      { id: 1, title: '新鲜芹菜 半斤',num: 4, price: 10 },
      { id: 2, title: '素米 500g', num: 1, price: 5 }
    ]
  },
  //tab
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  /* 用户点击右上角分享*/
  onShareAppMessage: function () {
  
  }
})