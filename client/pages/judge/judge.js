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
      '/resources/icon/star-white.png',
    ],
    food: [
      { id: 0, title: '小炒肉', userStars: [] },
      { id: 1, title: '大炒肉', userStars: [] },
      { id: 2, title: '苹果', userStars: [] },
      { id: 3, title: '香蕉', userStars: [] },
      { id: 4, title: '西红柿', userStars: [] }
    ],

  },
  onLoad: function (e) {
    var food = this.data.food;
    var len = food.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < 5; j++)
        food[i].userStars[j] = '/resources/icon/star-white.png'
    }
    this.setData({ food: food })
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
  },
  // 星星点击事件
  starTap: function (e) {
    var groupId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var lenFood = this.data.food.length;
    var food = this.data.food;

    for (var j = 0; j < food[groupId].userStars.length; j++) {
      if (j <= index) { // 小于等于index的是满心
        food[groupId].userStars[j] = '/resources/icon/star-yellow.png'
      } else { // 其他是空心
        console.log('false' + groupId + '-' + j)
        food[groupId].userStars[j] = '/resources/icon/star-white.png'
      }
      console.log(food[0])
    }

    // 重新赋值就可以显示了
    this.setData({
      food: food
    })
  }, 
  starsTap: function (e) {
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