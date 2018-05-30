// pages/subscribe/subscribe.js
var util = require('../../utils/util.js');  
var hintMsg = null;
Page({
  data: {
    array: ['食堂', '包间'],
    index: 0,
    date: '2010-02-02',
    time: '12:00',
    num: 1,
    minusStatus: 'disabled'  
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
  listenerTimePickerSelected: function (e) {
    //调用setData()重新绘制
    this.setData({
      time: e.detail.value,
    });
  },
  listenerDatePickerSelected: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  onLoad:function(e){
    var time = getNowTime();  
    this.setData({date:time});
  },
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  } ,
  handlePhoneNum: function (e) {
    var phoneNum = e.detail.value;
    if (validatePhoneNum(phoneNum)) {
      wx.showToast({
        title: hintMsg,
        icon: 'success',
        duration: 1500
      })
      this.setDate({ phone: phoneNum })
    } else {
      wx.showToast({
        title: hintMsg,
        icon: 'success',
        duration: 1500
      })
    }
  }
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
    hintMsg = "输入正确!"
    return true;
  }
}
function getNowTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  };
  if (day < 10) {
    day = '0' + day;
  };
  //  如果需要时分秒，就放开
  // var h = now.getHours();
  // var m = now.getMinutes();
  // var s = now.getSeconds();
  var formatDate = year + '-' + month + '-' + day;
  return formatDate;
} 