// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const collection = db.collection("vehicle");

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await collection.where({
        vehicle_type: event.vehicle_type,
        vehicle_number: event.vehicle_number,
        vehicle_date: event.vehicle_date
      })
      .skip(skip)
      .limit(event.limit)      
      .get()
  } catch (e) {
    console.error(e)
  }
}