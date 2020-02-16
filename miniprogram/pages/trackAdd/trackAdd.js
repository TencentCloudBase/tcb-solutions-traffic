// pages/trackAdd/trackAdd.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-1-1',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const intype = options.intype ? options.intype : "add";
    const customTitle = intype == "add" ? "增加轨迹" : "轨迹详情";
    this.setData({
      intype,
      customTitle,
    })
    // 测试数据
    intype == "view" && this.setData({
      locationAddress: '广州市海珠区新港中路397号',
      latitude: 23.099994,
      longitude: 113.324520,
      markers: [{
        latitude: 23.099994,
        longitude: 113.324520,
        name: 'T.I.T 创意园'
      }],
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
  timeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  regionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  // 获取位置
  chooseLocation() {
    const that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          locationAddress: res.address
        })
      },
      fail: (res) => {
        wx.getSetting({
          success: res => {
            let authSetting = res.authSetting
            if (!authSetting['scope.userLocation']) {
              this.setData({
                setAuth: true
              });
            }
          }
        })
      }
    })
  },

  // 开启授权
  callbackSetting(res) {
    if (res.detail.authSetting['scope.userLocation']) {
      this.setData({
        setAuth: false
      });
    }
  },
  // 添加轨迹
  formSubmit: function(e) {
    const info = e.detail.value;
    if (info.address == "") {
      util.alert("请输入详细地址");
      return;
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  // 删除轨迹
  delTrack() {
    wx.showModal({
      content: '确认删除该条轨迹？',
    })
  },
  // 打开位置
  openLocation(e) {
    console.log(e)
    wx.openLocation({
      longitude: 113.324520,
      latitude: 23.099994,
      name: "T.I.T 创意园",
      address: "广州市海珠区新港中路397号"
    })
  }
})