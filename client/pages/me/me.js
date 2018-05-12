// pages/me/me.js
Page({
  data: {
    src1: '../../resources/timg.png',
    src2: '../../resources/daoxiang.png',
    pic1: '../../resources/pic1.png',
    pic2: '../../resources/pic2.png',
    pic3: '../../resources/pic3.png',
    points: 0
  },
  handleLoginTap(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})
