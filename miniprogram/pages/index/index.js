
var app = getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    const db = wx.cloud.database();
    var that = this;
    db.collection('musics').where({
      _openid: 'user-open-id'
    })
      .get({
        success: function (res) {
          // res.data 是包含记录的数组
          // console.log(res.data)
          var list = res.data;
          that.setData({
            list: list
          })
          app.globalData.list = list
          console.log("全局变量的list数组:")
          console.log(app.globalData.list)
        }
      })
  },


  //跳转到播放列表
  goMyMusic(){
    wx.navigateTo({
      url: '../list/list',
      success:function(){
        console.log("success")
      },
      fail:function(){
        console.log("fail")
      }
    })
  },

  //跳转到排行榜
  goRankList() {
    wx.navigateTo({
      url: '../rank/rank',
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },

  //跳转到搜索页面
  goSearch() {
    wx.navigateTo({
      url: '../search/search',
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },

  goPlay() {
    var index = app.globalData.index;
    // console.log("索引啊！！！" + index)
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
  


})

 




