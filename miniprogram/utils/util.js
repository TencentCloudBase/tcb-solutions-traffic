const { stage } = require('../config');

/**
 * 区间随机数
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
} 

//转换MB兆字节
function converMbSize(limit) {
  var size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  var sizestr = size + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {//当小数点后为00时 去掉小数部分  
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}
//转换计算机单位
function converSize(limit) {
  var size = "";
  if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else { //其他转化成GB  
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }

  var sizestr = size + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {//当小数点后为00时 去掉小数部分  
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}


/**
 * 校验图片
 */
async function checkImage(filePath) {
  return new Promise((reslove, reject) => {
    wx.getFileSystemManager().readFile({
      filePath,
      success: buffer => {
        //检查图片
        wx.cloud.callFunction({
          name: 'openapi',
          data: {
            action: 'imgSecCheck',
            value: buffer.data,
            contentType: 'image/png'
          },
          //验证通过
          success: function (res) {
            reslove(res.result.errCode)
          },
          fail: function (err) {
            reslove(err)
          }
        })
      }
    })
  })
}

/**
 * json转换
 */
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 
module.exports = {
  randomNum,
  converMbSize,
  converSize,
  checkImage,
  json2Form
}
