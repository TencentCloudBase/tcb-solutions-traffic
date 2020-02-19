// miniprogram/pages/track/track.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfoList();
  },

  getInfoList() {
    const pageCount = this.data.pageCount;
    let trackList = pageCount == 1 ? [] : this.data.trackList;
    wx.cloud.callFunction({
      name: 'historicalRouteList',
      data: {
        pageIndex: this.data.pageCount
      }
    }).then(res => {
      console.log(res);
      res.result.data!=""&& this.setData({
        trackList: trackList.concat(res.result.data),
        pageCount: pageCount + 1
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getInfoList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})