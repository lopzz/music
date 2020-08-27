var app = getApp();

Page({
  data: {
    type: [
      { "0": '云音乐新歌榜' },
      { "1": '云音乐热歌榜' },
      { "2": '网易原创歌曲榜' },
      { "3": '云音乐飙升榜' },
      { "4": '云音乐电音榜' },
      { "5": 'UK排行榜周榜' },
      { "6": '美国Billboard周榜' },
      { "7": 'KTV唛榜' },

    ]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '排行榜'
    }) 
  },
  tap(e) {
    // console.log(e.currentTarget.dataset.id )
    let  id  = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/rankList/rankList?id=' + id + "&type=" + this.data.type[id][id],
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
  }

})