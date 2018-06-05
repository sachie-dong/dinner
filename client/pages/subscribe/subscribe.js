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
    minusStatus: 'disabled',
    result: {
      orderId:'',
      date: '',
      time: '',
      dinnerType: '',
      num: 0,
      personName: '',
      personPhone: '',
    }
  },
  onLoad:function(e){
    this.setData({
      date: util.formatDate1(),
    })
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    var dinnerTypeIndex = e.detail.value;
    var result = this.data.result;
    result.dinnerType = this.data.array[dinnerTypeIndex];
    this.setData({
      index: e.detail.value,
      result: result,
    });
  },
  listenerTimePickerSelected: function (e) {
    //调用setData()重新绘制
    var time = e.detail.value;
    var result = this.data.result;
    this.setData({
      time: time,
      result: result,
    });
  },
  listenerDatePickerSelected: function (e) {
    var date = e.detail.value;
    var result = this.data.result;
    result.date = date;
    this.setData({
      date: date,
      result: result,
    });
  },
  onLoad: function (e) {
    var time = getNowTime();
    this.setData({ date: time });
  },
  bindMinus: function () {
    var num = this.data.num;
    var result = this.data.result;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    result.num = num;
    // 将数值与状态写回  
    this.setData({
      num: num,
      result: result,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    var result = this.data.result;
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    result.num = num;
    this.setData({
      num: num,
      result: result,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    var result = this.data.result;
    // 将数值与状态写回  
    result.num = num;
    this.setData({
      num: num,
      result: result,
    });
  },
  handlePersonName:function(e){
    var result = this.data.result;
    result.personName=e.detail.value;
    this.setData({result:result})
  },
  handlePhoneNum: function (e) {
    var phoneNum = e.detail.value;
    var result = this.data.result;
    if (validatePhoneNum(phoneNum)) {
      wx.showToast({
        title: hintMsg,
        icon: 'success',
        duration: 1500
      })
      result.personPhone = phoneNum;
      this.setData({ phone: phoneNum, result: result })

    } else {
      wx.showToast({
        title: hintMsg,
        icon: 'success',
        duration: 1500
      })
    }
  },
  handleSubscribe:function(e){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var date=util.formatDate(new Date());  
    var orderId=date+''+timestamp;
    var result=this.data.result;
    result.orderId=orderId;
    wx.setStorageSync('resultSubscribe', result)
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
  var formatDate = year + '-' + month + '-' + day;
  return formatDate;
} 