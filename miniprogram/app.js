//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  globalData: {
    song: null,//音频上下文
    list: null, //存放歌曲
    flag: 1,  //默认进来play页面是播放的
    playMode: 'listLoop',
    index:0   //记录播放到第几首；直接进蓝圈默认进第0首
  },

})
