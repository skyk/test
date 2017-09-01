// pages/login/login.js
var api = require("../utils/api");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEnable:false,
    isGetVerCode:false,
    isActive:false,
    telValue:'',
    verCodeValue:'',
    wait:60,
    text:'',
  },

  getTel:function(e){
    var that = this;
    var flag = /^1[34578]\d{9}$/.test(e.detail.value)
    if (flag) {
      that.setData({
        telValue: e.detail.value,
        isActive: true
      })
    }else{
      that.setData({
        telValue: e.detail.value,
        isActive: false
      })
    }
    
    if (that.data.telValue != '' && that.data.verCodeValue != ''){
      that.setData({
        isEnable: true
      })
    }else{
      that.setData({
        isEnable: false
      })
    }
  },
  getVerCode: function (e) {
    var that = this;
    that.setData({
      verCodeValue: e.detail.value
    })
    if (that.data.telValue != '' && that.data.verCodeValue != '') {
      that.setData({
        isEnable: true
      })
    } else {
      that.setData({
        isEnable: false
      })
    }
  },
  bindGetVerCode:function(){
    var that = this;
      

        //获取手机验证码
        var timestamp = new Date().getTime() + app.globalData.differ;
        api.sendLoginSecurityCode(that.data.telValue, timestamp, function (res) {
          console.log(res)
          if (res.code == 200) {
            that.time();
          }else{
            wx.showModal({
              title: res.msg,
              showCancel: false,
              success: function (res) {

              }
            })
          }
        })
    
      
  },
  bindLogin:function(){
    var that = this;
    var flag = /^1[34578]\d{9}$/.test(that.data.telValue);
    if (flag) {

      //登录
      var timestamp = new Date().getTime() + app.globalData.differ;
      api.loginOnPhone(that.data.telValue, that.data.verCodeValue, timestamp, function (res) {
        console.log(res)
        if (res.code == 200) {
          console.log(res.data.user)
          var userData = JSON.stringify(res.data.user)
          app.globalData.userData = res.data.user;
          wx.setStorageSync('userData', userData);
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          wx.switchTab({
            url: '../index/index',
          })
        }
        if (res.code == 400) {
          wx.showModal({
            title: res.msg,
            showCancel: false,
            success: function (res) {

            }
          })
        }
        if (res.code == 500) {
          wx.showModal({
            title: res.msg,
            showCancel: false,
            success: function (res) {

            }
          })
        }
      })

    } else {
      wx.showModal({
        title: '手机号输入不正确',
        showCancel: false,
        success: function (res) {

        }
      })
    }
  },
  bindMakeCall:function(){
    wx.showModal({
      title: '联系客服',
      content: '每天09:00-18:00,我们竭诚为您服务!',
      cancelColor: '#0076FF',
      confirmText: '拨打',
      confirmColor: '#0076FF',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '12345'
          })
        } else if (res.cancel) {
          
        }
      }
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f5f5f5'
    })
    
  },

  time: function () {
    var that = this;
    if (that.data.wait == 0) {
      that.setData({
        wait: 60,
        text: '获取验证码',
        isGetVerCode: false
      })

    } else {
      that.setData({
        text: that.data.wait + 's后重新获取',
        isGetVerCode: true
      })
      that.data.wait--;
      setTimeout(function () {
        that.time()
      },1000)
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