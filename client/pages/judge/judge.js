// pages/judge/judge.js
Page({
  data: {
    flag: 0,
    zan: '/resources/icon/zan.png',
    zan1: '/resources/icon/zan-red.png',
    cai: '/resources/icon/cai.png',
    cai1: '/resources/icon/cai-red.png',
    userStars: [
      '/resources/icon/star-white.png',
      '/resources/icon/star-white.png',
      '/resources/icon/star-white.png',
      '/resources/icon/star-white.png',
      '/resources/icon/star-white.png'
    ],
    food: [
      { id: 1, title: '小炒肉' },
      { id: 1, title: '大炒肉' },
      { id: 1, title: '苹果' },
      { id: 1, title: '香蕉' },
      { id: 1, title: '西红柿'}
    ],

  },
  //提交
  modalcnt: function () {
    wx.showModal({
      title: '提示',
      content: '评价成功回到首页',
      complete() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }  ,
  // 星星点击事件
  starTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '/resources/icon/star-yellow.png'
      } else { // 其他是空心
        tempUserStars[i] = '/resources/icon/star-white.png'
      }
    }
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars
    })
  }

    
})