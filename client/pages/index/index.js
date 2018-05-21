 //index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js') ;
const app = getApp()

Page({
  data: {
    selected: true,
    selected1: false,
    // 切换
    category: [
      { name: '果味', id: 'guowei' },
      { name: '凉菜', id: 'liang' },
      { name: '热菜', id: 're' },
      { name: '其他', id: 'else' }
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei'
  },
  //事件处理函数
  // 切换
  onReady() {
    var self = this;
    // wx.request({
    //     url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
    //     success(res){
    //         self.setData({
    //             detail : res.data
    //         })
    //     }
    // });

  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  },
  //tab
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected: false,
      selected2: true
    })
  },
  //tab结束
  // 搜索开始
  onLoad: function () {
    console.log('onLoad') ;
    var that = this;
     //初始化的时候渲染wxSearchdata 
    WxSearch.init(that,43,['weappdev','小程序','wxParse','wxSearch','wxNotification']);
    WxSearch.initMindKeys(['weappdev.com','微信小程序开发','微信开发','微信小程序']);
  }  ,
  wxSearchFn: function (e) {
    var that = this 
    WxSearch.wxSearchAddHisKey(that)
  }, 
  wxSearchInput: function (e) {
    var that = this 
    WxSearch.wxSearchInput(e, that)
  }, 
  wxSerchFocus: function (e) { 
    var that = this 
    WxSearch.wxSearchFocus(e, that)
  }, 
  wxSearchBlur: function (e) { 
    var that = this 
    WxSearch.wxSearchBlur(e, that)
  }, 
  wxSearchKeyTap: function (e) { 
    var that = this
    WxSearch.wxSearchKeyTap(e, that)
  }, 
  wxSearchDeleteKey: function (e) { 
    var that = this 
  WxSearch.wxSearchDeleteKey(e, that); 
  }, wxSearchDeleteAll: function (e) { 
    var that = this 
    WxSearch.wxSearchDeleteAll(that);
  }, 
  wxSearchTap: function (e) { 
    var that = this 
    WxSearch.wxSearchHiddenPancel(that)
  }
  // 搜索结束

})
