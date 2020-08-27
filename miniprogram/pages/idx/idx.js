// pages/idx/idx.js
Page({
  data: {
    avatarUrl: './user-unlogin.png'
  },
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //获取头像
              this.setData({
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
          
        }
      }
    })
  },
  onGetUserInfo: function (e) {
   //用户按了允许授权按钮
   if(e.detail.userInfo){
     //授权成功后，跳转进入小程序首页
     wx.redirectTo({
       url: '../index/index',
     })
   }
  }
})