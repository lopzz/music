// pages/list/list.js

var app = getApp();

Page({
  data: {
    list:[],//存放音乐信息
  },
  onLoad: function (options) {
   
    },
    tap(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/play/play?index=' + index,
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

  onShow:function(){
    const db = wx.cloud.database();
    var that = this;
    db.collection('musics').where({
      _openid: 'user-open-id'
    })
      .get({
        success: function (res) {
          // res.data返回的记录的数组
          // console.log(res.data)
          var list = res.data;
          that.setData({
            list: list
          })
          if(res.data.length==0){
           that.setData({
             isNull:true
           })
          }
        }
      });
  },

  onHide: function () {
    app.globalData.list = this.data.list;  //把歌曲都存到全局变量的list数组中      
  }
  
})