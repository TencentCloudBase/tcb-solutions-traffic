/**
 * 创建历史轨迹
 * @author xiaoyu
 */
// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
cloud.init();
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const { route_longitude, route_latitude, route_creation_time, vehicle_id } = event;
  let result = {code: 0};
  return new Promise(resolve => {
    if (!route_longitude || !route_latitude) {
      result = {
        message: "地理位置信息不能为空",
        code: -1
      };
      return resolve(result);
    };
    reverseGeocoder(route_latitude, route_longitude,res => {
      if (res == null){
        result = {
          message: "位置解析失败",
          code: -1
        };
        return resolve(result);
      }
      const { address, address_component} = res;
      const historicalRoute = {
        vehicle_id: vehicle_id,
        route_creator: OPENID,
        route_creation_time: route_creation_time,
        route_longitude: route_longitude,
        route_latitude: route_latitude,
        route_location: db.Geo.Point(route_longitude, route_latitude),
        route_province: address_component.province,
        route_city: address_component.city,
        route_district: address_component.district,
        route_address: address
      };
      db.collection('historical_route').add({
        data: historicalRoute,
      }).then(res => {
        result.route = historicalRoute;
        result.message = res.errMsg;
        return resolve(result);
      }).catch(err => {
        console.error(err);
        result = {
          message: err,
          code: -1
        };
        return resolve(result);
      });
    })
  })
}

const reverseGeocoder = function (latitude, longitude, callback) {
  const apiUrl = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${process.env.MAPKEY}`
  request(apiUrl, function (error, response, body) {
    let code = response.statusCode.toString(), result = null
    if (code == '200') {
      let res = JSON.parse(body);
      if (res.status == 0) {
        result = res.result;
      } else {
        console.error(res)
      }
    }
    callback && callback(result);
  });
};