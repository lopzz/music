// pages/list/list.js

var dataObj = require('../../data/data.js');
var indexObj = require('../index/index.js');
var app = getApp();

Page({
  data: {
    list:[]//存放音乐信息
  },
  onLoad: function (options) {
    const db = wx.cloud.database();
    var that = this;
    db.collection('musics').where({
      _openid: 'user-open-id'
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          var list = res.data;
          that.setData({
            list: list
          })
          // console.log(that.data.list)
          app.globalData.list=list
        }
      });
    },
    tap(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/play/play?index=' + index,
    })
  }
})