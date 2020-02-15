// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
let options;

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("event.header:", event.header)
  if (event.header) {
    options = {
      url: event.url,
      headers: JSON.parse(event.header)
    };
  } else {
    options = event.url;
  }

  return new Promise((resolve, reject) => {
    try {
      request(options, (err, resp, body) => {
        if (err) {
          return reject(err)
        }
        return resolve(body)
      })
    } catch (e) {
      return reject(err)
    }
  })
}