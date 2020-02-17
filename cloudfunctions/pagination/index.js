// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 公共分页函数
exports.main = async (event, context) => {
  const dbName = event.dbName;
  let { filter, pageIndex, pageSize } = event;
  filter = event.filter ? event.filter : null;
  pageIndex = pageIndex ? pageIndex : 1;
  pageSize = pageSize ? pageSize : 10;
  const countResult = await db.collection(dbName).where(filter).count();
  const total = countResult.total;
  const totalPage = Math.ceil(total / pageSize);
  let hasMore = true;
  if(pageIndex >= totalPage){
    hasMore = false;
  }

  return db.collection(dbName).where(filter).skip((pageIndex - 1) * pageSize).limit(pageSize).get().then(res=>{
    res.hasMore = hasMore;
    return res;
  })
}