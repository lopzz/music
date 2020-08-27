// pages/comment/comment.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotComment:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = app.globalData.curSong.id;
    var pic = app.globalData.curSong.al.picUrl;
    that.setData({
      pic: pic
    })
    wx.request({
      url: 'http://kangjie.club:3000/comment/hot?id=' + id + '&type=0',
      success: (res) => {
        that.setData({
          hotComment: res.data.hotComments,
        })
        console.log(res);
      },

    });
  },
    
    


  onShow:function(){
    

  }

})