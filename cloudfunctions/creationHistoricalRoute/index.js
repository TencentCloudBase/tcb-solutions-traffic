/**
 * 创建历史轨迹
 * @author xiaoyu
 */
// 云函数入口文件
const cloud = require('wx-server-sdk');
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
      resolve(result);
    };
    const historicalRoute = {
      route_creator: OPENID,
      route_creation_time: route_creation_time,
      route_longitude: route_longitude,
      route_latitude: route_latitude,
      route_location: db.Geo.Point(route_longitude, route_latitude)
    };
    db.collection('historical_route').add({
      data: historicalRoute,
    }).then(res => {
      result.route = historicalRoute;
      result.message = res.errMsg;
      resolve(result);
    }).catch(err => {
      console.error(err);
      result = {
        message: err,
        code: -1
      };
      resolve(result);
    });
  })
}