const { stage, version } = require('../config.js');
import util from './util';
const oldPage = Page;
Page = function (app) {
  const oldOnLoad = app.onLoad;
  const oldOnShow = app.onShow;
  const oldOnHide =  app.onHide;
  const oldOnUnLoad = app.onUnLoad;
  app.onLoad = function (options) { // 这里必须使用function, 不可以使用箭头函数， 否则this指向错误
    // console.log("扩展onLoad");
    // onLoad函数在是当前page实例上下文中执行，所以当前的this为当前page实例
    // 如果不使用call来硬绑定，而是直接app.onLoad()，那么onLoad里的this将为app这个对象
    // 即我们正常在page.js里Page(app) 括号里面我们自己写的page对象
    if (typeof app.onLoad === 'function') {
      oldOnLoad && oldOnLoad.call(this, options); //apply
    }
  }
  app.onShow = function () { 
    // console.log("扩展onShow");
    if (typeof app.onShow === 'function') {
      oldOnShow && oldOnShow.call(this);
    }
  }

  app.onHide = function () {
    const that = this;
    // console.log("扩展onHide")
    if (typeof app.onHide === 'function') {
      oldOnHide && oldOnHide.call(this);
    }
  }
  app.onUnLoad = function () {
    const that = this;
    if (that.rewardedVideoAd) {
      this.rewardedVideoAd.destroy()
    }
    if (typeof app.onUnLoad === 'function') {
      oldOnUnLoad && oldOnUnLoad.call(this);
    }
  }

  /**
   * 配置分享
   */
  if (!app.onShareAppMessage) {
    app.onShareAppMessage = function () {
      return {
        title: "社区防疫小程序",
        imageUrl: "",
        path: '/pages/index/index'
      }
    }
  }

  /**
  * 跳转到其他小程序
  */
  app.onToMiniProgramClicked = function (e) {
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.appid, // 要跳转的小程序的appid
      path: e.currentTarget.dataset.path, // 跳转的目标页面
      envVersion: 'release',
      success(res) {
        console.log("调用成功");
      },
      fail(res) {
        that.onShowAd();
        console.log("取消调用");
      }
    })
  }

  return oldPage(app)
}