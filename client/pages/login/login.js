// pages/login/login.js
var maxTime = 10
var currentTime = maxTime
var hintMsg = null
var interval = null

Page({
  data: {
    ajxtrue: 'fail',
    time: '获取验证码',
    phoneNum: null,
    disabled:false
  },
  handleIsNull: function (e) {
    var text = e.detail.value;
    if (text != 0) {
      this.setData({ ajxtrue: 'ok' })
    } else {
      this.setData({ ajxtrue: 'fail' })
    }
  },
  handlePhoneNum: function (e) {
    this.setData({ phoneNum: e.detail.value })
  },
  sendPhoneNum: function (e) {
    var that=this;
    var phoneNum = this.data.phoneNum;
    if (validatePhoneNum(phoneNum)) {
      wx.showToast({
        title: hintMsg,
        icon: 'success',
        duration: 1500
      })
      that.setData({disabled:true})
      interval = setInterval(function () {
        currentTime--;
        that.setData({ time: currentTime })
        if (currentTime <= 0) {
          clearInterval(interval)
          currentTime = maxTime
          that.setData({ time: '重发验证码' })
          that.setData({disabled:false})
        }
      }, 1000)   
    } else {
      wx.showToast({
        title: hintMsg,
        icon: 'success',
        duration: 1500
      })
    }
  },
})
function validatePhoneNum(phoneNum) {
  if (phoneNum.length != 11) {
    hintMsg = "手机号有误！"
    return false;
  }
  else if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
    hintMsg = "手机号有误！"
    return false;
  } else {
    hintMsg = "短信已经发送！"
    return true;
  }
}
