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
    returnFood: {
      sumCount: 0,
      total: '0.00',
      list: [],
    },
    goPay: '立即支付',
    currentTab: 0,
    columnTab: 0,
    showModalStatus: false,
    bottomBarRight: 'bottom-bar-right-disabled',
    bottomBarCart: false,
    moneyFlag: true,
    sumCountFlag: false,
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
  /* 点击加号 */
  bindPlus: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    var name = this.data.food[id].name;
    var img = this.data.food[id].img;
    var price = toDecimal2(this.data.food[id].price);
    var count = this.data.food[id].count;  //库存数
    var buyCount = this.data.food[id].buyCount;    //购买数
    var minusStatus = this.data.food[id].minusStatus;  //最小化按钮
    var sumCount = this.data.returnFood.sumCount;   //购买总数
    var total = toDecimal2(this.data.returnFood.total);   //购买总额
    var list = this.data.returnFood.list;     //购买物品列表 
    var bottomBarRight = 'bottom-bar-right-disabled';  //立即支付背景样式
    var bottomBarCart = false;   //购物车样式
    var goPay = '';   //立即支付样式
    var itemIsExist = false;
    var item = { name: '', price: '0.00', count: 0, img: '' }     //购买物品
    var moneyFlag = true;
    var sumCountFlag = this.data.sumCountFlag;
    var returnFood = this.data.returnFood;
    var food = this.data.food;
    // 不作过多考虑自增1  
    if (count > 0) {
      buyCount++;
      count--;
      sumCount++;
      total = toDecimal2(parseFloat(total) + parseFloat(price));
      for (let i = 0; i < list.length; i++) {
        if (list[i].name == name) {
          list[i].price = toDecimal2(buyCount * parseFloat(price));
          list[i].count = buyCount;
          itemIsExist = true;
        }
      }

      if (itemIsExist == false) {
        item.name = name;
        item.img = img;
        item.price = parseFloat(price);
        item.count = 1;
        list.push(item);
      }
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'success',
        duration: 1200,
      })
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  

    if (buyCount < 1) {
      minusStatus = 'disabled';
    } else {
      minusStatus = 'normal';
    }

    if (sumCount > 0) {
      bottomBarRight = 'bottom-bar-right-normal';
      bottomBarCart = true;
      goPay = '去支付';
      moneyFlag = false;
      sumCountFlag = true;
    }

    food[id].buyCount = buyCount;
    food[id].count = count;
    food[id].minusStatus = minusStatus;
    returnFood.total = total;
    returnFood.sumCount = sumCount;
    returnFood.list = list;
    this.setData({
      food: food,
      bottomBarCart: bottomBarCart,
      bottomBarRight: bottomBarRight,
      goPay: goPay,
      moneyFlag: moneyFlag,
      sumCountFlag: sumCountFlag,
      returnFood: returnFood,
    });
  },

  bindMinus: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    var name = this.data.food[id].name;
    var price = toDecimal2(this.data.food[id].price);
    var count = this.data.food[id].count;  //库存数
    var buyCount = this.data.food[id].buyCount;    //购买数
    var minusStatus = this.data.food[id].minusStatus;  //最小化按钮
    var sumCount = this.data.returnFood.sumCount;   //购买总数
    var total = toDecimal2(this.data.returnFood.total);   //购买总额
    var list = this.data.returnFood.list;     //购买物品列表 
    var bottomBarRight = 'bottom-bar-right-disabled';  //立即支付背景样式
    var bottomBarCart = false;   //购物车样式
    var goPay = '';   //立即支付样式
    var itemIsExist = false;
    var item = { name: '', price: '0.00', count: 0, img: '' }     //购买物品
    var moneyFlag = true;
    var sumCountFlag = this.data.sumCountFlag;
    var returnFood = this.data.returnFood;
    var food = this.data.food;
    // 如果大于1时，才可以减  
    if (buyCount > 0) {
      buyCount--;
      count++;
      sumCount--;
      total = toDecimal2(parseFloat(total) - parseFloat(price));
      for (let i = 0; i < list.length; i++) {
        if (list[i].name == name) {
          if (buyCount == 0) {
            list.splice(i, 1);
          } else {
            list[i].price = toDecimal2(buyCount * parseFloat(price));
            list[i].count = buyCount;
          }
        }
      }
    }
    if (buyCount < 1) {
      minusStatus = 'disabled';
    } else {
      minusStatus = 'normal';
    }
    if (sumCount > 0) {
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
    food[id].buyCount = buyCount;
    food[id].count = count;
    food[id].minusStatus = minusStatus;
    returnFood.total = total;
    returnFood.sumCount = sumCount;
    returnFood.list = list;
    this.setData({
      food: food,
      bottomBarCart: bottomBarCart,
      bottomBarRight: bottomBarRight,
      goPay: goPay,
      moneyFlag: moneyFlag,
      sumCountFlag: sumCountFlag,
      returnFood: returnFood,
    });
  },


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
  haneldGoPay: function (e) {
    if (this.data.goPay == '去支付') {
      var returnFood=this.data.returnFood;
      var returnFoodStr = JSON.stringify(returnFood)
      wx.navigateTo({
        url: '../order/order?returnFood=' + returnFoodStr,
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