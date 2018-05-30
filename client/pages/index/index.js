//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movies: [
      { url: '../../resources/jpg/lunbo1.jpg', },
      { url: '../../resources/jpg/lunbo2.jpg', },
      { url: '../../resources/jpg/lunbo3.jpg', },
      { url: '../../resources/jpg/lunbo4.jpg', },
      { url: '../../resources/jpg/lunbo5.jpg', },
      { url: '../../resources/jpg/lunbo6.jpg', },
    ],
    src1:'../../resources/icon/subscribe.png', 
    src2:'../../resources/icon/booking.png', 
    src3:'../../resources/icon/coupons.png', 
    src4:'../../resources/icon/checkout.png',
    arrow: '../../resources/icon/arrow.png',
    wxpay:'../../resources/icon/wxpay.png',
    phoneNum: '0353 - 4360047'
  },
  onLoad: function () {

  },
  handleCalling:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum,
    })
  },
  handleMap: function () {
   var that=this;
   var latitude='';
   var longitude='';
   wx.getLocation({
     success: function(res) {
       latitude=res.latitude;
       longitude=res.longitude;
     },
   })
   wx.openLocation({
     latitude: Number(latitude),
     longitude: Number(longitude),
   })
  },
  handleEnvironment:function(){
    wx.navigateTo({
      url: '../environment/environment',
    })
  },
  handleSubscribe:function(){
    wx.navigateTo({
      url: '../subscribe/subscribe',
    })
  },
  handleBooking:function(){
    wx.navigateTo({
      url: '../booking/booking',
    })
  },
  handleCheckout:function(){
    wx.navigateTo({
      url: '../checkout/checkout',
    })
  }

})
