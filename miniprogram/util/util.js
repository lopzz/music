class util{
    // constructor(){}

  //将秒数转换成分钟:秒数
  //   transTime(time) {
  //   var minutes = time / 60;
  //   minutes = Math.floor(minutes);
  //   var seconds = time % 60;
  //   seconds = Math.round(seconds);
  //   if (seconds == 60) {  //只有大于59.5秒的情况
  //     minutes++;
  //     seconds = 0;
  //   }
  //   return {
  //     seconds,
  //     minutes
  //   }
  // }

//判断分钟数和秒数小于10就要前面补0
//   timeLtTen(minutes, seconds) {
//   if (minutes < 10 && seconds < 10) {   //分钟数不足10前面补个0
//     minutes = "0" + minutes;
//     seconds = "0" + seconds;
//   }
//   else if (minutes < 10 && seconds >= 10) {
//     minutes = "0" + minutes;
//   }
//   else if (minutes >= 10 && seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   return { minutes, seconds };
// }


}


module.exports = {
 util:util
}