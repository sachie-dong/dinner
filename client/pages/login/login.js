// pages/login/login.js
var phoneNum=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  handleBtnvalidate:function(event){
    var num=event.detail.value
    if(num!=null){
      // catchCode.disable=true
    }
  },
  handlePhoneNum:function(event){
    phoneNum=event.detail.value
    console.log(phoneNum)
  }
})