// pages/couponDetails/couponDetails.js
var app = getApp()
var api = require("../utils/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarColor: ['#47b7fc', '#fe6667', '#323c46', '#fc4c90'],
    couponType: ['individual', 'universal', 'no-residue', 'exchange'],
    index:'',
    isSingle:false,
    initData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '优惠券详情'
    })
    console.log(options)
    //已领完
    if(options.flag == 4){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: that.data.navigationBarColor[2],
      })
      //单品券
      if (options.type == 1) {
        that.setData({
          index: that.data.couponType[2],
          isSingle: true
        })
      }
      //全场券
      if (options.type == 3) {
        that.setData({
          index: that.data.couponType[2],
          isSingle: false
        })
      }
    }else{
      //单品券
      if (options.type == 1){
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: that.data.navigationBarColor[0],
        })
        that.setData({
          index: that.data.couponType[0],
          isSingle: true
        })
      }
      //全场券
      if (options.type == 3) {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: that.data.navigationBarColor[1],
        })
        that.setData({
          index: that.data.couponType[1],
          isSingle: false
        })
      }
    }

    api.getCouponPublishInfoOnTaoCouponByPubId(options.pubid, app.globalData.isOpenPosition, app.globalData.positionNS, app.globalData.positionWE, new Date().getTime() + app.globalData.differ, function(res){
      console.log(res)
      if (res.code == 200) {
        //有效期处理
        if (res.data.couponPublish.validate_type == 'FIXED'){
          res.data.couponPublish.validate_time = res.data.couponPublish.starttime + '-' + res.data.couponPublish.endtime
        }else{
          res.data.couponPublish.validate_time = '券领取后' + res.data.couponPublish.relative_time + '天有效'
        }
        //使用须知处理
        if (res.data.couponPublish.baseamount && res.data.couponPublish.getnum){
          res.data.couponPublish.instruction = "实付" + res.data.couponPublish.baseamount + "元集" + res.data.couponPublish.getnum +"花"
        }else{
          res.data.couponPublish.instruction = ''
        }
        that.setData({
          initData: res.data.couponPublish
        })
      } else {
        wx.showModal({
          title: res.msg,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
    if(that.data.flag){
      that.setData({
        isToastShow: true,
        msg: '领取成功',
        flag: false
      })
      setTimeout(function () {
        that.setData({
          isToastShow: false,
          flag: true
        })
      }, 2000)
    }
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
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})