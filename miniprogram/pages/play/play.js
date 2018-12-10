// pages/play/play.js
import url from "../../config/url.js";
var app = getApp();
Page({
  data: {
    song: {},//存放id，duration,current等，而app.js里的song是音频上下文，不同的
    id:"",
    duration: 0,
    current: 0,
    isDown: false,
    lrc: {
      "0": "正在获取歌词"
    },
    currentLrc: "",
    //默认进来就播放
    flag:1,
    //播放模式：列表播放、单曲循环、随机播放，默认为列表播放
    playMode: '',
    //播放模式数量
    playModeNum: 3,
    //播放模式三个按钮的下标
    playModeIndex: 0,
    // musicList:[],
    index:0,
    //是否收藏（默认歌曲没被收藏）
    collected:0
  },

  onLoad: function (options) {
    var index = parseInt(options.index);
    console.log(index)
    var id = app.globalData.list[index].id;//在app.globalData的list数组通过index获得id
    var musicList = app.globalData.list
    var flag = app.globalData.flag
    var playMode = app.globalData.playMode
    console.log(musicList);
    const db = wx.cloud.database()
    var that=this
    //查询数据库，当前各歌曲是否被收藏
    db.collection('musics').doc(''+id).get({
      success: function (res) {
        that.setData({
          collected:res.data.collected
        })
      }
    })
    this.setData({ 
      id:id,
      index: index,
      musicList:musicList,
      flag:flag,
      playMode:playMode,
     })
  
    //获得歌词
    wx.request({
      url: `${url.lyric}?id=${id}`,
      success: (res) => {
        // console.log("获取歌词: ", res);
        var lyric = res.data.lrc.lyric;
        // console.log(lyric);
        let r = /\[(.*?)](.*)/g;
        var obj = {};
        lyric.replace(r, ($0, $1, $2) => {
          // console.log( $1,$2 ) 
          obj[$1.substring(0, 5)] = $2
        });
        this.setData({
          lrc: obj
        })
      }
    })

    //获得歌名、歌手
    wx.request({
      url: `${url.song}?ids=${id}`,
      success: (res) => {
        // console.log(res)
        this.setData({
          song: res.data.songs[0]   //点中的歌
        });
        console.log('asdasdas')
        console.log(res.data.songs[0])
       wx.setNavigationBarTitle({
          title: res.data.songs[0].name + '-'+res.data.songs[0].ar[0].name//歌名和歌手名
        })
      }
    });
    
   var song = app.globalData.song;
   console.log(song);
    if (!song) {
      song = app.globalData.song = wx.createInnerAudioContext();
    }
    song.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
    // song.pause(); // 先停止 再调用 播放 , 否则有可能更新(onTimeUpdate)不会触发
    // song.play();
    var flag = app.globalData.flag;
    if(flag == 1){
      song.pause();
      song.play();
    }else{  
      song.play();//为了更新进度条，不然flag=0时进来进度条是最左边
      song.pause();
    }
   
    song.onPlay(res => {
      console.log("开始播放");
    })

    song.onTimeUpdate(res => {
      // console.log( song );
      if (this.data.duration !== song.duration) {
      this.setData({
          duration: song.duration
        })
      };
      if (!this.data.isDown) {
        this.setData({
          current: song.currentTime
        })
      };
      let { currentTime: c } = song;
      let min = Math.floor(c / 60);
      let sec = Math.floor(c % 60);
      var attr = (min < 10 ? "0" + min : "" + min) + ":" + (sec < 10 ? "0" + sec : "" + sec);
      // console.log(attr)
      if (attr in this.data.lrc && "el-" + attr !== this.data.currentLrc) {        //歌词到了下一句
        // console.log("滚动歌词啦!")
        this.setData({
          currentLrc: "el-" + attr
        })
      }
    }),

      song.onEnded(() => {
        console.log("自然播放完");
        var playMode = app.globalData.playMode;
        // var playMode = this.data.playMode;
        if (playMode == 'listLoop') {//列表循环
          app.globalData.song.loop = false;
          this.next();
          console.log("列表循环");
          this.setData({ loop: false });
        }
        if (playMode == 'singleLoop') {//单曲循环
          app.globalData.song.loop = true;
          this.myplay();
          console.log("单曲循环");
          app.globalData.song.loop = false;
          this.setData({ loop: true });
        }
        if (playMode == 'random') {//随机播放
          app.globalData.song.loop = false;
          this.randomPlay();
          console.log("随机播放");
          this.setData({ loop: false });
        }
      })

  }, //onLoad结束

  //正在移动滑块
  changing() {
    this.setData({
      isDown: true
    })
  },
  
  change(e) {
    console.log(e.detail)
    this.setData({
      isDown: false
    })
    app.globalData.song.seek(e.detail.value);//跳到滑块移动到的时间
  },

  //播放
  myplay(){
    if (this.data.index >= 0) {//当index为正数时
      var i = this.data.index % this.data.musicList.length;
    } else {    //当index为负数时
      var k = this.data.index % this.data.musicList.length;
      if (k != 0) {
        var i = this.data.musicList.length + k;
      } else {
        var i = k;
      }  
    }
    let song = app.globalData.song;
    let id = app.globalData.list[i].id;

    //获得歌词
    wx.request({
      url: `${url.lyric}?id=${id}`,
      success: (res) => {
        // console.log("获取歌词: ", res);
        var lyric = res.data.lrc.lyric;
        // console.log(lyric);
        let r = /\[(.*?)](.*)/g;
        var obj = {};
        lyric.replace(r, ($0, $1, $2) => {
          // console.log( $1,$2 ) 
          obj[$1.substring(0, 5)] = $2
        });
        this.setData({
          lrc: obj
        });
      }
    })

    //获得歌名、歌手
    wx.request({
      url: `${url.song}?ids=${id}`,
      success: (res) => {
        // console.log(res)
        this.setData({
          song: res.data.songs[0]   //点中的歌
        });
        // app.globalData.song = res.data.songs[0]; //把请求的歌存到全局变量
         wx.setNavigationBarTitle({
          title: res.data.songs[0].name + '-' + res.data.songs[0].ar[0].name//歌名和歌手名
        })
      }
    });
    
    console.log(song)
    song.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
    song.pause(); // 先停止 再调用 播放 , 否则有可能更新(onTimeUpdate)不会触发
    song.play();
  },

  // 控制
  //暂停
  playOrPause() {
    let song = app.globalData.song;
    if(this.data.flag==0){
      // song.pause();
      song.play();
      this.setData({ flag: 1 })
      app.globalData.flag = 1;
    }else{
      song.pause();
      this.setData({flag:0})
      app.globalData.flag = 0;
    }
  },

//上一首
  previous(){
    this.setData({
      index: this.data.index-1,
      flag: 1
    });
    app.globalData.flag = 1;
    setTimeout(() => {
      if(app.globalData.playMode=='random'){
        this.randomPlay();
      }  
      else{
      this.myplay();
      }
    }, 800);//等待一段时间再重新播放
    //  console.log('上一首');
  },

  //切换到下一首
  next: function () {
    this.setData({
      index:this.data.index+1,
      flag: 1
    });
    app.globalData.flag = 1;
    setTimeout(() => {  //等待一段时间再重新播放
      if (app.globalData.playMode == 'random') {
        this.randomPlay();
      }
      else {
        this.myplay();
      }
    }, 800);
    // console.log('下一首');
  },

  //随机播放
  randomPlay: function () {
    var max = this.data.musicList.length;
    var rand = Math.floor(Math.random() * max);
    console.log(rand);
    this.setData({ index: rand });
    this.myplay();
  },

  

  //设置播放模式playMode
  setPlayMode: function () {
    var playModeIndex = this.data.playModeIndex;
    playModeIndex++;
    this.setData({
      playModeIndex: playModeIndex
    })
    var curPlayModeIndex = playModeIndex % this.data.playModeNum;
    if (curPlayModeIndex == 0) {//列表循环
      this.setData({ playMode: 'listLoop' });
      app.globalData.playMode = 'listLoop';
    }
    else if (curPlayModeIndex == 1) {//单曲循环
      this.setData({ playMode: 'singleLoop' });
      app.globalData.playMode = 'singleLoop';
    }
    else if (curPlayModeIndex == 2) {     //随机播放
      this.setData({ playMode: 'random' });
      app.globalData.playMode = 'random';
    };
  } ,

  //涟漪效果
  ripple: function (res) {
    console.log(res.touches[0]);
    var img = res.currentTarget.dataset.image;
    console.log(img);
    this.setData({ clickImg: img });
    var that = this;
    //获取点击元素的top和left
    wx.createSelectorQuery().select('.' + img).boundingClientRect(function (rect) {
      that.setData({      //这里不能用this.setData,因为this是调用function(rect)的对象
        rectTop: rect.top,
        rectLeft: rect.left
      })
    }).exec();

    var x = res.touches[0].pageX - this.data.rectLeft - 100//计算涟漪的位置
    var y = res.touches[0].pageY - this.data.rectTop - 100;
    //4个主功能的涟漪效果
    if (img == 'myMusic') {
      this.setData({
        rippleStyle1: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () { //不延时不行
        that.setData({
          rippleStyle1: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    } else if (img == 'friendMusic') {
      this.setData({
        rippleStyle2: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStyle2: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'settings') {
      this.setData({
        rippleStyle3: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStyle3: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'rankList') {
      this.setData({
        rippleStyle4: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStyle4: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    //以下是控制按钮的涟漪效果
    else if (img == 'playOrPause') {
      this.setData({
        rippleStyleplayOrPause: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStyleplayOrPause: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'previous') {
      this.setData({
        rippleStyleprevious: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStyleprevious: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'middle') {
      this.setData({
        rippleStyleMiddle: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStyleMiddle: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'next') {
      this.setData({
        rippleStylenext: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStylenext: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'more') {
      this.setData({
        rippleStylemore: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStylemore: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
    else if (img == 'set-mode') {
      this.setData({
        rippleStylePlayMode: ''     //每次进来刷新掉rippleStyle
      })
      setTimeout(function () {
        that.setData({
          rippleStylePlayMode: 'top:' + y + 'px;left:' + x + 'px;animation:ripple 0.7s ease-out;'
        });
      }, 100)
    }
  },
  //收藏
  collect:function(){
    const db = wx.cloud.database()
    //收藏
    if(this.data.collected==0){
      this.setData({ collected: 1 })
      db.collection('musics').add({
        data: {
          _id: '' + this.data.song.id,
          id: this.data.song.id,
          name: this.data.song.name,
          arName: this.data.song.ar[0].name,
          picUrl: this.data.song.al.picUrl,
          collected:1
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
    //取消收藏
    else{
      this.setData({ collected: 0 })
      db.collection('musics').doc('' + this.data.song.id).remove({
        success: function (res) {
          console.log(res)
        }
      })
    }
  }
})