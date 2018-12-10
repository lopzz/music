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
    userInfo: null,
    song: null,//音频上下文
    list: null,
    flag: 1,
    playMode: 'listLoop'
  },
  judgeDirection() {
    var direction = this.data.direction;
    if (direction == "up") {
      this.playOrPause();
    } else if (direction == "down") {
      this.stop();
    } else if (direction == "left") {
      this.previous();
    } else if (direction == "right") {
      this.next();
    }
  },
})
