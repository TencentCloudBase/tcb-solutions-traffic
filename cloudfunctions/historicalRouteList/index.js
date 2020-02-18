/**
 * @author hmt
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event)
   const { OPENID } = cloud.getWXContext();
  const res = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'pagination',
    // 传递给云函数的参数
    data: {
        dbName: 'historical_route',
        filter: {
          'route_creator': OPENID
        },
        orderBy: {
          _id: 'desc',
          route_creation_time: 'desc'
        },
        pageIndex: event.pageIndex,
        pageSize: 10
      }
  })
  return res.result

   
}