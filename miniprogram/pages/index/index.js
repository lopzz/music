var dataObj = require('../../data/data.js');
// var util = require('../../util/util.js')
import {util} from '../../util/util.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})

 




