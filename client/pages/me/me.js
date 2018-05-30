// pages/me/me.js
Page({
  data: {
    src1: '../../resources/icon/timg.png',
    src2: '../../resources/icon/daoxiang.png',
    pic1: '../../resources/icon/pic1.png',
    pic2: '../../resources/icon/pic2.png',
    pic3: '../../resources/icon/pic3.png',
    points: 0
  },
  handleLoginTap(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})
