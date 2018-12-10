import url from "../../config/url.js";
var app = getApp();
Page({
  data: {
    input:"",
    isSearch:false,
    result:[]
  },
  onLoad: function (options) {

  },
  //键盘输入事件
  bindinput: function (e) {
    this.setData({
      input: e.detail.value
    });
    this.tapSearch();

  },
  //获得焦点事件
  bindfocus:function(){
    this.setData({
      isSearch:true
    })
  },
  //失去焦点事件
  bindblur:function(){
    this.setData({
      isSearch: false
    })
  },
  tapSearch(){
    if(this.data.input!=""){//输入不为空才请求
      wx.request({
        url: `${url.search}?keywords=${this.data.input}`,
        success: (res) => {
          this.setData({
            result: res.data.result.songs
          })
          app.globalData.list = this.data.result;
        }
      })
    }
  },
  tapPlay(e){
    let { index } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/play/play?index=${index}`,
    })
  }
})