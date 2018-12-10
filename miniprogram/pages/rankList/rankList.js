// pages/list/list.js
import url from "../../config/url.js";
var app = getApp();

Page({
  data: {
    list: [],
  },
  onLoad: function (options) {
    console.log(options)
    let { id, type } = options;
    // id=0;
    wx.request({
      url: `${url.list}?idx=${id}`,
      success: (res) => {
        console.log(res);
        var list = res.data.playlist.tracks
        this.setData({
          list: list
        })
        // console.log(this.data.list)
        app.globalData.list = list;  //把歌曲都存到全局变量的list数组中      
        wx.setNavigationBarTitle({
          title: type
        }) 
      }
    })
  },
  tap(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/play/play?index='+index,
    })
  }
})