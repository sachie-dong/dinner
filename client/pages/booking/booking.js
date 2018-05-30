// pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: '../../resources/icon/cart2.png',
    cart1: '../../resources/icon/cart3.png',
    img: '../../resources/jpg/index.jpg',
    food: [
      {
        id: 1,
        name: '苹果',
        price: '0.10',
        img: '../../resources/jpg/apple.jpg',
        count: 28,
        buyCount: 0,
        minusStatus: 'disabled',
      },
      {
        id: 2,
        name: '矿泉水',
        price: '2.00',
        img: '../../resources/jpg/water.jpg',
        count: 33,
        buyCount: 0,
        minusStatus: 'disabled',
      }
    ],
    returnFood: [],
    goPay: '立即支付',
    moneyFlag: true,
    money: '0.00',
    sumCount: 0,
    sumCountFlag: false,
    scrollLeft: 0,
    selected: true,
    selected1: false,
    currentTab: 0,
    columnTab: 0,
    num: 0,
    num1: 0,
    showModalStatus: false,
    bottomBarRight: 'bottom-bar-right-disabled',
    bottomBarCart: false,
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  swichColumn: function (e) {
    if (this.data.columnTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        columnTab: e.target.dataset.current
      })
    }
  },
  bindMinus: function (event) {
    var data = this.data;
    var id = event.currentTarget.dataset.id;
    var num = data.food[id].buyCount;
    var count = data.sumCount;
    var minusStatus = data.food[id].minusStatus;
    var bottomBarRight = 'bottom-bar-right-disabled';
    var bottomBarCart = false;
    var money = data.money;
    var goPay = null;
    var sumCountFlag = false;
    var moneyFlag = true;
    var returnFood = data.returnFood;
    var itemObj = { name: '', price: 0.00, count: 0 };
    // 如果大于1时，才可以减  
    if (num > 0) {
      num--;
      data.food[id].count++;
      count--;
      money = toDecimal2(parseFloat(data.money) - parseFloat(data.food[id].price));
    }
    
    itemObj.name = data.food[id].name;
    
    const length = returnFood.length
    for (let i = 0; i < length; i++) {
      if (returnFood.length != 0) {
        console.log(i+returnFood[i].name)
        console.log(i+itemObj.name)
        if (returnFood[i].name == itemObj.name) {
          if (num == 0) {
            returnFood.splice(i, 1);
          } else {
            returnFood[i].price = toDecimal2(num * parseFloat(data.food[id].price));
            returnFood[i].count = num;
          }
        }
      }
    }

    if (num <= 0) {
      minusStatus = 'disabled';
    } else {
      minusStatus = 'normal';
    }
    if (count > 0) {
      bottomBarRight = 'bottom-bar-right-normal';
      bottomBarCart = true;
      goPay = '去支付';
      sumCountFlag = true;
      moneyFlag = false;
    } else {
      bottomBarRight = 'bottom-bar-right-disabled';
      bottomBarCart = false;
      goPay = '立即支付';
      sumCountFlag = false;
      moneyFlag: true;
    }
    data.food[id].buyCount = num;
    data.food[id].minusStatus = minusStatus;
    this.setData({
      food: data.food,
      minusStatus: minusStatus,
      bottomBarCart: bottomBarCart,
      bottomBarRight: bottomBarRight,
      sumCount: count,
      goPay: goPay,
      money: money,
      moneyFlag: moneyFlag,
      sumCountFlag: sumCountFlag,
      returnFood: returnFood,
    });
  },
  /* 点击加号 */
  bindPlus: function (event) {
    var data = this.data;
    var id = event.currentTarget.dataset.id;
    var num = data.food[id].buyCount;    //购买数
    var minusStatus = data.food[id].minusStatus;
    var count = data.sumCount;   //购买总数
    var bottomBarRight = 'bottom-bar-right-disabled';  //立即支付背景样式
    var bottomBarCart = false;   //购物车样式
    var goPay = null;   //立即支付样式
    var sumCountFlag = false;   //数量统计样式
    var moneyFlag = true;    //未选购商品样式
    var money = 0.00;        //总额
    var itemObj = { name: '', price: 0.00, count: 0 };
    var returnFood = data.returnFood;
    var exist = false;

    // 不作过多考虑自增1  
    if (data.food[id].count > 0) {
      num++;
      data.food[id].count--;
      count++;
      money = parseFloat(data.money) + parseFloat(data.food[id].price);

      itemObj.name = data.food[id].name;

      const length = returnFood.length
      for (let i = 0; i < length; i++) {
        if (returnFood.length != 0) {
          if (returnFood[i].name == data.food[id].name) {
            returnFood[i].price = toDecimal2(num * parseFloat(data.food[id].price));
            returnFood[i].count = num;
            exist = true;
          }
        }
      }
      if (exist == false) {
        itemObj.price = parseFloat(data.food[id].price);
        itemObj.count = 1;
        returnFood.push(itemObj);
      }
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'success',
        duration: 1200,
      })
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  

    if (num < 1) {
      minusStatus = 'disabled';
    } else {
      minusStatus = 'normal';
    }
    if (count > 0) {
      bottomBarRight = 'bottom-bar-right-normal';
      bottomBarCart = true;
      goPay = '去支付';
      moneyFlag = false;
      sumCountFlag = true;
    } else {
      bottomBarRight = 'bottom-bar-right-disabled';
      bottomBarCart = false;
      goPay = '立即支付';
      moneyFlag = true;
      sumCountFlag = false;
    }
    data.food[id].buyCount = num;
    data.food[id].minusStatus = minusStatus;
    this.setData({
      food: data.food,
      buyCount: num,
      minusStatus: minusStatus,
      bottomBarCart: bottomBarCart,
      bottomBarRight: bottomBarRight,
      goPay: goPay,
      money: toDecimal2(money),
      moneyFlag: moneyFlag,
      sumCountFlag: sumCountFlag,
      sumCount: count,
      returnFood: returnFood,
    });
  },
  /* 输入框事件 */

  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  showModel: function (e) {
    this.setData({ showModalStatus: true })
  },
  haneldGoPay:function(e){
    if (this.data.goPay == '去支付'){
      wx.navigateTo({
        url: '../order/order',
      })
    }
  }
})
function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}  