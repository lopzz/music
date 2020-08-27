// pages/list/list.js
import url from "../../config/url.js";
var app = getApp();

Page({
  data: {
    list: [],
    n:20,//一次请求的歌曲数
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    console.log(options)
    let { id, type } = options;
    this.setData({
      id:options.id,
      type:options.type
    })
    // id=0;
    wx.request({
      url: `${url.list}?id=${id}`,
      success: (res) => {
        console.log(res);
        var list = res.data.playlist.tracks.slice(0,10)
        this.setData({
          list: list
        })
        wx.setNavigationBarTitle({
          title: type
        }) 
      }
    });
    setTimeout(() => {
      wx.hideNavigationBarLoading();
    }, 750);
  },

  tap(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/play/play?index='+index,
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

  onHide:function(){  //进入play页面才存放歌曲列表，不然在加载rankList页面就把歌曲存进全局变量，列表就变成rankList的歌曲了
    app.globalData.list = this.data.list;  //把歌曲都存到全局变量的list数组中      
    console.log("全局变量的list数组:")
    console.log(app.globalData.list)
  },

  //拉上去刷新页面
  onPullDownRefresh:function(event){
    wx.showNavigationBarLoading();
    var id = this.data.id;
    var type = this.data.type;
    wx.request({
      url: `${url.list}?id=${id}`,
      success: (res) => {
        console.log(res);
        var list = res.data.playlist.tracks.slice(0, 20)
        this.setData({
          list: list
        });
        wx.setNavigationBarTitle({
          title: type
        });
        wx.stopPullDownRefresh();
      }
    });
    setTimeout(() => {
      wx.hideNavigationBarLoading();
    }, 750);
  },

  //拉到底加载更多
  onReachBottom:function(event){
    wx.showNavigationBarLoading();
    var n = this.data.n;
    var id = this.data.id;
    var type = this.data.type;
    var list2 = this.data.list;
    wx.request({
      url: `${url.list}?id=${id}`,
      success: (res) => {
        console.log(res);
        var list = res.data.playlist.tracks.slice(n, n+20)
        list2 = list2.concat(list);
        this.setData({
          list: list2,
          n:n+20,
        })
        wx.setNavigationBarTitle({
          title: type
        })
      }
    });
    setTimeout(() => {
      wx.hideNavigationBarLoading();
  },750);
}

})