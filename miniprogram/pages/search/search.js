import url from "../../config/url.js";
var app = getApp();
Page({
  data: {
    input:"",
    isSearch:false,
    result:[],
    hotSearch:"",
    hotSearch2:""//保存热搜
  },
  onLoad: function (options) {
    var ranNum = Math.round(Math.random()*9);
    // console.log(ranNum)
    //得到热搜
    wx.request({
      url: 'http://kangjie.club:3000/search/hot',
      success: (res) => {
        var hotSearch = res.data.result.hots[ranNum].first;//只拿一条热搜
        this.setData({
          hotSearch:hotSearch,
          hotSearch2:hotSearch
        });
        this.setData({
          input: hotSearch
        });
        console.log(res);
      }
    })
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
      isSearch:true,
      hotSearch:""
    })
  },
  //失去焦点事件
  bindblur:function(){
    this.setData({
      isSearch: false,
      hotSearch: this.data.hotSearch2
    })
  },
  tapSearch(){
    var that = this;
    if(this.data.input!=""){//输入不为空才请求
      wx.request({
        url: `${url.search}?keywords=${this.data.input}`,
        success: (res) => {
          console.log(res)
          that.setData({
            result: res.data.result.songs
          })
          app.globalData.list = that.data.result;
        }
      })
    }
  },
  tapPlay(e){
    let { index } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/play/play?index=${index}`,
    })
  },

  goPlay() {
    var index = app.globalData.index;
    wx.navigateTo({
      url: '../play/play?index=' + index,
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },

  onHide() {   //进入play页面才存放歌曲列表
    app.globalData.list = this.data.result;  //把歌曲都存到全局变量的list数组中      
    console.log("全局变量的list数组:")
    console.log(app.globalData.list)
  }
})