// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ["火车", "汽车", "公交", "飞机", "轮船", "其他"],
    index: 0,
    date: '2020-02-13',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'cloud://demo-3ee737.3f9c-demo-3ee737-1257366989/1.png'
    }, {
      id: 1,
      type: 'image',
        url: 'cloud://demo-3ee737.3f9c-demo-3ee737-1257366989/2.png',
    }, {
      id: 2,
      type: 'image',
        url: 'cloud://demo-3ee737.3f9c-demo-3ee737-1257366989/3.png'
    }],
    resultList: []
  },

  searchVehicle(){
    wx.cloud.callFunction({
      name: 'pagination',
      data: {
        dbName: 'vehicle',
        pageIndex: 1,
        pageSize: 10
      }
    }).then(res=>{
      console.log(res);
      this.setData({
        resultList: res.result.data
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})