// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 公共分页函数
exports.main = async (event, context) => {
  const dbName = event.dbName;
  let { filter, orderBy, pageIndex, pageSize } = event;
  filter = event.filter ? event.filter : null;
  orderBy = event.orderBy ? event.orderBy : null;
  pageIndex = pageIndex ? pageIndex : 1;
  pageSize = pageSize ? pageSize : 10;
  const countResult = filter ? await db.collection(dbName).where(filter).count() : await db.collection(dbName).count();
  const total = countResult.total;
  const totalPage = Math.ceil(total / pageSize);
  let hasMore = true;
  if(pageIndex >= totalPage){
    hasMore = false;
  }

  let result = filter ? db.collection(dbName).where(filter) : db.collection(dbName);
  result = result.skip((pageIndex - 1) * pageSize).limit(pageSize);
  if(!orderBy){
    return result.get().then(res => {
      res.hasMore = hasMore;
      return res;
    })
  }

  // 一个或多个排序条件，如 {'_id':'asc','title':'desc'}
  if (Object.prototype.toString.call(orderBy) === '[object Object]') {
    for (let i = 0, len = Object.keys(orderBy).length; i < len; i++ ){
      const key = Object.keys(orderBy)[i];
      result = result.orderBy(key, orderBy[key]);
    }
    return result.get().then(res => {
      res.hasMore = hasMore;
      return res;
    })
  }
}